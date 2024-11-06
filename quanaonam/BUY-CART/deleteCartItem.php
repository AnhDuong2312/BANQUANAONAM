<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$dbname = 'qlqa';
$username = 'root';
$password = '';
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error]));
}

// Lấy dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"), true);
error_log("Dữ liệu nhận được: " . print_r($data, true)); // Ghi lại dữ liệu nhận được

// Kiểm tra xem dữ liệu có được gửi và hợp lệ không
$user_id = isset($data['userId']) ? (int)$data['userId'] : null; // Ép kiểu về số nguyên
$product_id = isset($data['productId']) ? (int)$data['productId'] : null; // Ép kiểu về số nguyên

// Kiểm tra dữ liệu đầu vào
if ($user_id !== null && $product_id !== null) {
    // Ghi lại thông tin trước khi thực hiện xóa
    error_log("Xóa sản phẩm: user_id = $user_id, product_id = $product_id");

    $query = "DELETE FROM cart_order WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("ii", $user_id, $product_id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => "Sản phẩm đã được xóa khỏi giỏ hàng."]);
            } else {
                echo json_encode(['success' => false, 'message' => "Không tìm thấy sản phẩm để xóa."]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => "Không thể thực thi truy vấn: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => "Chuẩn bị truy vấn không thành công: " . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Thông tin sản phẩm hoặc người dùng không hợp lệ."]);
}

$conn->close();
?>
