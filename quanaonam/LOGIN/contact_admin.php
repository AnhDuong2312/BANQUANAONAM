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

// Kết nối đến cơ sở dữ liệu
$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Kết nối thất bại.']));
}

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$name = $data['name'];
$email = $data['email'];
$subject = $data['subject'];
$message = $data['message'];

// Truy vấn để lưu thông tin liên hệ
$stmt = $conn->prepare("INSERT INTO contacts (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $user_id, $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi gửi tin nhắn.']);
}

$stmt->close();
$conn->close();
?>
