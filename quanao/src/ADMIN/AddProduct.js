import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/addproduct.css'; 

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost/quanaonam/DANHMUC/getcategories.php');
        if (response.data.success && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          toast.error('Không thể tải danh mục từ server!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Không thể tải danh mục từ server!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Vui lòng chọn hình ảnh!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append('category_id', category);
    formData.append('name', productName);
    formData.append('slug', slug);
    formData.append('small_description', smallDescription);
    formData.append('description', description);
    formData.append('original_price', originalPrice);
    formData.append('selling_price', sellingPrice);
    formData.append('quantity', quantity);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost/quanaonam/PRODUCT/addproduct.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Sản phẩm đã được thêm thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
        // Reset form fields
        setCategory("");
        setProductName("");
        setSlug("");
        setSmallDescription("");
        setDescription("");
        setOriginalPrice("");
        setSellingPrice("");
        setQuantity("");
        setImage(null);
      } else {
        toast.error(`Thêm sản phẩm thất bại: ${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Không thể kết nối với máy chủ. Vui lòng thử lại sau.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  return (
    <div className="add-product-container">
      <h2>Thêm Sản Phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chọn Danh Mục</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Chọn Danh Mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tên Sản Phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập Tên Sản Phẩm"
              required
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Nhập slug"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mô Tả Ngắn</label>
          <input
            type="text"
            value={smallDescription}
            onChange={(e) => setSmallDescription(e.target.value)}
            placeholder="Nhập Mô Tả Ngắn"
          />
        </div>

        <div className="form-group">
          <label>Mô Tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập Mô Tả"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Giá Gốc</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Nhập Giá Gốc"
              required
            />
          </div>

          <div className="form-group">
            <label>Giá Bán</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="Nhập Giá Bán"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Số Lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nhập Số Lượng"
            required
          />
        </div>

        <div className="form-group">
          <label>Hình Ảnh</label>
          <input type="file" onChange={handleImageChange} accept="image/*" required />
        </div>

        <div className="submit">
          <button type="submit" className="submit-btn">Thêm Sản Phẩm</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
