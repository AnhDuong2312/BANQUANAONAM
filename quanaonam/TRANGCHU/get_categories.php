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


// Truy vấn danh sách các danh mục
$sql = "SELECT id, name FROM categories";
$result = $conn->query($sql);

$categories = [];

if ($result->num_rows > 0) {
    // Chuyển dữ liệu thành mảng
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
}

// Đặt header và trả về JSON
header('Content-Type: application/json');
echo json_encode($categories);

// Đóng kết nối
$conn->close();
?>
