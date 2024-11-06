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

// Kiểm tra nếu có category_id trong request
if (isset($_GET['category_id'])) {
    $category_id = intval($_GET['category_id']);
    
    // Câu lệnh SQL để lấy sản phẩm theo danh mục
    $sql = "SELECT id, name, image, small_description, selling_price FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $products = [];
    if ($result->num_rows > 0) {
        $baseImageUrl = 'http://localhost/quanaonam/PRODUCT/'; // Đường dẫn cơ bản cho hình ảnh
        while ($row = $result->fetch_assoc()) {
            $row['image'] = $baseImageUrl . $row['image']; // Thêm tiền tố cho đường dẫn hình ảnh
            $products[] = $row; // Thêm sản phẩm đã xử lý vào danh sách
        }
    }

    // Trả về danh sách sản phẩm dưới dạng JSON
    echo json_encode($products);

    $stmt->close();
} else {
    echo json_encode(["error" => "Không tìm thấy category_id"]);
}

$conn->close();
?>
