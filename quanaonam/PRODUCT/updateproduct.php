<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$host = 'localhost';
$db_name = 'qlqa';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $db_name);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}

// Nhận dữ liệu từ client
$id = $_POST['id'];
$name = $_POST['name'];
$slug = $_POST['slug'];
$small_description = $_POST['small_description'];
$description = $_POST['description'];
$original_price = $_POST['original_price'];
$selling_price = $_POST['selling_price'];
$quantity = $_POST['quantity'];

// Khởi tạo biến hình ảnh
$image = $_FILES['image'];

// Xử lý tải lên hình ảnh
$image_path = null;
if ($image) {
    $target_dir = "uploads/"; // Thay đổi thư mục lưu trữ hình ảnh
    $target_file = $target_dir . basename($image["name"]);

    // Kiểm tra xem tệp có phải là hình ảnh hay không
    $check = getimagesize($image["tmp_name"]);
    if($check !== false) {
        // Di chuyển tệp tạm đến thư mục đích
        if (move_uploaded_file($image["tmp_name"], $target_file)) {
            $image_path = $target_file; // Lưu đường dẫn hình ảnh
        } else {
            echo json_encode(['success' => false, 'message' => 'Có lỗi khi tải lên hình ảnh']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Tệp không phải là hình ảnh']);
        exit;
    }
}

// Câu truy vấn để cập nhật sản phẩm
$sql = "UPDATE products SET 
            name = ?, 
            slug = ?, 
            small_description = ?, 
            description = ?, 
            original_price = ?, 
            selling_price = ?, 
            quantity = ?, 
            image = COALESCE(?, image) 
        WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssdissi', $name, $slug, $small_description, $description, $original_price, $selling_price, $quantity, $image_path, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Có lỗi khi cập nhật sản phẩm: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
