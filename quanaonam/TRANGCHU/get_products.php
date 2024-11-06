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
    die("Connection failed: " . $conn->connect_error);
}

// Truy vấn dữ liệu sản phẩm
$sql = "SELECT id, name, slug, small_description, description, selling_price, image FROM products";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Cập nhật đường dẫn ảnh để trỏ đến thư mục PRODUCT/uploads
        $row['image'] = 'http://localhost/quanaonam/PRODUCT/' . $row['image'];
        $products[] = $row;
    }
}

// Trả về JSON
echo json_encode($products);
$conn->close();
?>
