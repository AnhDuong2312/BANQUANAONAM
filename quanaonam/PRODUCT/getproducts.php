<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$db_name = 'qlqa'; // Tên cơ sở dữ liệu của bạn
$username = 'root'; // Tên người dùng MySQL của bạn
$password = ''; // Mật khẩu MySQL của bạn

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Truy vấn để lấy tất cả sản phẩm
    $stmt = $conn->prepare("SELECT id, name, slug, small_description, description, original_price, selling_price, quantity, image FROM products");
    $stmt->execute();

    // Lấy tất cả sản phẩm
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Kiểm tra nếu không có sản phẩm nào
    if (empty($products)) {
        // Nếu không có sản phẩm, trả về thông báo
        echo json_encode(['success' => true, 'data' => []]); // Trả về mảng rỗng
    } else {
        // Chỉnh sửa đường dẫn hình ảnh
        $baseUrl = 'http://localhost/quanaonam/PRODUCT/uploads/'; // Căn cứ đường dẫn
        foreach ($products as &$product) {
            // Thêm đường dẫn đầy đủ vào trường hình ảnh
            $product['image'] = $baseUrl . basename($product['image']);
        }
        // Trả về dữ liệu dưới dạng JSON
        echo json_encode(['success' => true, 'data' => $products]);
    }

} catch (PDOException $e) {
    // Trả về thông báo lỗi dưới dạng JSON
    echo json_encode(['success' => false, 'message' => "Connection failed: " . $e->getMessage()]);
}

?>
