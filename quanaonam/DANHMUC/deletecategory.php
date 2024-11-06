<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");

// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';  // Tên người dùng cơ sở dữ liệu
$password = '';  // Mật khẩu của cơ sở dữ liệu
$database = 'qlqa';  // Tên cơ sở dữ liệu

$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Kiểm tra xem yêu cầu có phải là DELETE không
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Lấy dữ liệu JSON từ thân yêu cầu
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem ID có được cung cấp hay không
    if (isset($data['id'])) {
        $id = $data['id'];

        // Xóa danh mục khỏi cơ sở dữ liệu
        $sql = "DELETE FROM categories WHERE id=?";
        $stmt = $conn->prepare($sql);
        
        if ($stmt === false) {
            die(json_encode(["message" => "Lỗi trong chuẩn bị truy vấn: " . $conn->error]));
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Kiểm tra số hàng bị ảnh hưởng để xác định xem việc xóa có thành công không
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Xóa danh mục thành công"]);
        } else {
            echo json_encode(["message" => "Không tìm thấy danh mục hoặc không thể xóa."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Thiếu thông tin trong yêu cầu."]);
    }
} else {
    echo json_encode(["message" => "Phương thức không hợp lệ."]);
}

// Đóng kết nối
$conn->close();
?>
