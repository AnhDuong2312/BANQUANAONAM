import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toast
import '../ADMINCSS/allproducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]); // Khởi tạo là mảng rỗng
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    small_description: '',
    description: '',
    original_price: '',
    selling_price: '',
    quantity: '',
    image: null 
  });

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/quanaonam/PRODUCT/getproducts.php'); // Địa chỉ API
        console.log(response.data); 

        if (response.data.success) { 
          setProducts(Array.isArray(response.data.data) ? response.data.data : []); 
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại sau.'); 
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      id: product.id,
      name: product.name,
      slug: product.slug,
      small_description: product.small_description,
      description: product.description,
      original_price: product.original_price,
      selling_price: product.selling_price,
      quantity: product.quantity,
      image: null 
    });
  };


  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .delete(`http://localhost/quanaonam/PRODUCT/deleteproduct.php`, {
          data: { id: id },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
          toast.success('Xóa sản phẩm thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch(() => {
          setError("Có lỗi khi xóa sản phẩm");
          toast.error('Có lỗi khi xóa sản phẩm!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append('id', formData.id);
    updatedFormData.append('name', formData.name);
    updatedFormData.append('slug', formData.slug);
    updatedFormData.append('small_description', formData.small_description);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('original_price', formData.original_price);
    updatedFormData.append('selling_price', formData.selling_price);
    updatedFormData.append('quantity', formData.quantity);

   
    if (formData.image) {
      updatedFormData.append('image', formData.image); 
    }

    axios
      .post("http://localhost/quanaonam/PRODUCT/updateproduct.php", updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        const updatedProducts = products.map((product) =>
          product.id === formData.id ? { ...product, ...formData, image: formData.image.name } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        setFormData({
          id: '',
          name: '',
          slug: '',
          small_description: '',
          description: '',
          original_price: '',
          selling_price: '',
          quantity: '',
          image: null 
        });
        toast.success('Cập nhật sản phẩm thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch(() => {
        setError("Có lỗi khi cập nhật sản phẩm");
        toast.error('Có lỗi khi cập nhật sản phẩm!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="all-products">
      <h2>Tất cả sản phẩm</h2>

      {editingProduct ? (
        <form onSubmit={handleSubmit}>
          <h3>Sửa sản phẩm</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Tên sản phẩm"
            required
          />
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleFormChange}
            placeholder="Slug sản phẩm"
            required
          />
          <input
            type="text"
            name="small_description"
            value={formData.small_description}
            onChange={handleFormChange}
            placeholder="Mô tả ngắn"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Mô tả chi tiết"
            required
          />
          <input
            type="number"
            name="original_price"
            value={formData.original_price}
            onChange={handleFormChange}
            placeholder="Giá gốc"
            required
          />
          <input
            type="number"
            name="selling_price"
            value={formData.selling_price}
            onChange={handleFormChange}
            placeholder="Giá bán"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            placeholder="Số lượng"
            required
          />
          <input
            type="file" 
            name="image"
            accept="image/*" 
            onChange={handleImageChange} 
            required
          />
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => setEditingProduct(null)}>Hủy</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Slug</th>
              <th>Mô tả ngắn</th>
              <th>Mô tả</th>
              <th>Giá gốc</th>
              <th>Giá bán</th>
              <th>Số lượng</th>
              <th>Ảnh</th>
              <th>Chỉnh sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => ( 
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.slug}</td>
                <td>{product.small_description}</td>
                <td>{product.description}</td>
                <td>{product.original_price}</td>
                <td>{product.selling_price}</td>
                <td>{product.quantity}</td>
                <td>
                  <img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>
                  <button onClick={() => handleEdit(product)}>Sửa</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Xóa</button>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllProducts;
