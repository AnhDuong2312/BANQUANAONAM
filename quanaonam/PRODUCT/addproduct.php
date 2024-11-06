<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$dbname = 'qlqa';
$username = 'root';
$password = '';

// Tạo kết nối
$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Kết nối cơ sở dữ liệu thất bại: ' . $conn->connect_error]));
}

// Kiểm tra nếu yêu cầu là POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $category_id = $_POST['category_id'];
    $name = $_POST['name'];
    $slug = $_POST['slug'];
    $small_description = $_POST['small_description'];
    $description = $_POST['description'];
    $original_price = $_POST['original_price'];
    $selling_price = $_POST['selling_price'];
    $quantity = $_POST['quantity'];

    // Xử lý upload hình ảnh
    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];
        
        // Kiểm tra kiểu tệp
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($image['type'], $allowedTypes)) {
            echo json_encode(['success' => false, 'message' => 'Kiểu tệp không hợp lệ. Vui lòng tải lên hình ảnh (JPEG, PNG, GIF).']);
            exit;
        }

        $imageName = time() . '-' . basename($image['name']);
        $targetDir = 'uploads/'; // Thư mục lưu trữ hình ảnh
        $targetFilePath = $targetDir . $imageName;

        // Kiểm tra thư mục và tạo nếu chưa có
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Upload hình ảnh
        if (move_uploaded_file($image['tmp_name'], $targetFilePath)) {
            // Thêm sản phẩm vào cơ sở dữ liệu
            $stmt = $conn->prepare("INSERT INTO products (category_id, name, slug, small_description, description, original_price, selling_price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("issssdiss", $category_id, $name, $slug, $small_description, $description, $original_price, $selling_price, $quantity, $targetFilePath);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm sản phẩm: ' . $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể tải lên hình ảnh.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Chưa có hình ảnh nào được tải lên.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức yêu cầu không hợp lệ.']);
}

$conn->close();
?>
