<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$host = 'localhost';
$dbname = 'qlqa';
$username = 'root';
$password = '';

// Kết nối đến cơ sở dữ liệu
$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error]);
    exit();
}

// Nhận dữ liệu JSON từ React qua phương thức POST
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id'], $data['product_id'], $data['product_name'], $data['product_image'], $data['size'], $data['quantity'], $data['price'])) {
    $userId = $data['user_id'];
    $productId = $data['product_id'];
    $productName = $data['product_name'];
    $productImage = $data['product_image'];
    $size = $data['size'];
    $quantity = $data['quantity'];
    $price = $data['price'];

    // Thực hiện truy vấn SQL để thêm sản phẩm vào giỏ hàng
    $query = "INSERT INTO cart_order (user_id, product_id, product_name, product_image, size, quantity, price)
              VALUES ('$userId', '$productId', '$productName', '$productImage', '$size', '$quantity', '$price')";

    if ($conn->query($query) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Sản phẩm đã được thêm vào giỏ hàng.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm sản phẩm vào giỏ hàng: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không đầy đủ.']);
}

$conn->close();
?>
