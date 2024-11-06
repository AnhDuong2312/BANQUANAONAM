<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");

// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'qlqa';

$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Kết nối thất bại: " . $conn->connect_error]));
}

// Kiểm tra xem yêu cầu có phải là DELETE không
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id'])) {
        $id = $data['id'];

        // Xóa bản ghi khỏi cơ sở dữ liệu
        $sql = "DELETE FROM contacts WHERE id=?";
        $stmt = $conn->prepare($sql);
        
        if ($stmt === false) {
            echo json_encode(["success" => false, "message" => "Lỗi trong chuẩn bị truy vấn: " . $conn->error]);
            exit;
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Xóa tin nhắn thành công"]);
        } else {
            echo json_encode(["success" => false, "message" => "Không tìm thấy tin nhắn hoặc không thể xóa."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Thiếu thông tin trong yêu cầu."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Phương thức không hợp lệ."]);
}

$conn->close();
?>
