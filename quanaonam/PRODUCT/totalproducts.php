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

try {
    // Truy vấn để đếm tổng số sản phẩm
    $sql = "SELECT COUNT(*) as count FROM products";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    // Trả về JSON với tổng số sản phẩm
    echo json_encode(['count' => $result['count']]);
} catch (Exception $e) {
    // Xử lý lỗi nếu có
    echo json_encode(['error' => 'Lỗi khi truy vấn cơ sở dữ liệu']);
} finally {
    // Đóng kết nối
    $stmt->close();
    $conn->close();
}
?>
