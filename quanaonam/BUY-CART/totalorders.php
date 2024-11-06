<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "qlqa";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['error' => "Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error]));
}

$sql = "SELECT COUNT(*) as count FROM order_detail"; // Thay "orders" bằng tên bảng chứa thông tin đơn hàng
$result = $conn->query($sql);
$data = $result->fetch_assoc();

echo json_encode($data);

$conn->close();
?>
