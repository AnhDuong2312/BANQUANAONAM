<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Thông tin kết nối cơ sở dữ liệu
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

// Nhận từ khóa tìm kiếm từ URL
$query = $_GET['query'] ?? '';
$products = [];

if ($query) {
    // Chuẩn bị câu truy vấn với LIKE để tìm sản phẩm dựa trên tên
    $stmt = $conn->prepare("SELECT id, name, slug, small_description, description, selling_price, image FROM products WHERE name LIKE ?");
    $searchTerm = "%" . $query . "%";
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    // Xử lý kết quả truy vấn và cập nhật đường dẫn ảnh
    while ($row = $result->fetch_assoc()) {
        $row['image'] = 'http://localhost/quanaonam/PRODUCT/' . $row['image'];
        $products[] = $row;
    }
    $stmt->close();
}

// Trả về JSON
echo json_encode($products);
$conn->close();
?>
