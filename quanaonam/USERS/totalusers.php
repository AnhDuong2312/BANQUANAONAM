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

$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Kết nối cơ sở dữ liệu thất bại: ' . $conn->connect_error]));
}


$totalUsers = 0;

try {
    // Lấy tổng số người dùng có role_as = 0
    $role_as = 0;
    $sql = "SELECT COUNT(*) as count FROM users WHERE role_as = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $role_as);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    // Lưu kết quả vào biến tổng người dùng
    $totalUsers = $result['count'];

    // Trả về JSON
    echo json_encode(['count' => $totalUsers]);
} catch (Exception $e) {
    // Xử lý lỗi nếu có
    echo json_encode(['error' => 'Lỗi khi truy vấn cơ sở dữ liệu']);
} finally {
    // Đóng kết nối database
    $stmt->close();
    $conn->close();
}
?>
