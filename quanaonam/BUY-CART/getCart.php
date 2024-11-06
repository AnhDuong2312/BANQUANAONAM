<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$dbname = 'qlqa';
$username = 'root';
$password = '';

// Kết nối đến cơ sở dữ liệu
$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(['error' => "Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error]));
}

// Xác minh user_id được truyền vào và thực hiện truy vấn
if (isset($_GET['user_id']) && !empty($_GET['user_id'])) {
    $user_id = intval($_GET['user_id']);  // Đảm bảo user_id là số nguyên
    $query = "SELECT product_id, product_image, product_name, size, quantity, price FROM cart_order WHERE user_id = ?";
    $stmt = $conn->prepare($query);

    // Kiểm tra nếu truy vấn được chuẩn bị thành công
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $cartItems = $result->fetch_all(MYSQLI_ASSOC);

        // Kiểm tra và trả về kết quả
        if (empty($cartItems)) {
            echo json_encode(['success' => true, 'message' => "Giỏ hàng của bạn đang trống."]);
        } else {
            echo json_encode(['success' => true, 'data' => $cartItems]);
        }

        // Đóng kết nối
        $stmt->close();
    } else {
        echo json_encode(['error' => "Truy vấn không hợp lệ."]);
    }
} else {
    echo json_encode(['error' => 'user_id không hợp lệ hoặc không được cung cấp.']);
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();
?>
