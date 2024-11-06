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

// Xác minh ID được truyền vào và thực hiện truy vấn
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);  // Đảm bảo ID là số nguyên
    $query = "SELECT name, small_description, description, selling_price, image FROM products WHERE id = $id";
    $result = $conn->query($query);

    // Kiểm tra và trả về kết quả
    if ($result && $result->num_rows > 0) {
        $product = $result->fetch_assoc();

        // Thêm tiền tố cho đường dẫn ảnh
        $baseImageUrl = 'http://localhost/quanaonam/PRODUCT/';
        $product['image'] = $baseImageUrl . $product['image'];

        echo json_encode($product);
    } else {
        echo json_encode(['error' => 'Sản phẩm không tồn tại.']);
    }
} else {
    echo json_encode(['error' => 'ID sản phẩm không hợp lệ.']);
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();
?>
