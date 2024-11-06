// Đặt lại mã trong file AllCategories.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/allcategory.css';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    image: null 
  });

  useEffect(() => {
    axios
      .get("http://localhost/quanaonam/DANHMUC/getcategories.php")
      .then((response) => {
          if (response.data.success && Array.isArray(response.data.data)) {
              setCategories(response.data.data);
          } else {
              setCategories([]);
              setError("Dữ liệu không hợp lệ.");
          }
          setLoading(false);
      })
      .catch((error) => {
          setError("Có lỗi khi lấy dữ liệu từ server");
          setLoading(false);
      });
  }, []);

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: null 
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      axios
        .delete(`http://localhost/quanaonam/DANHMUC/deletecategory.php`, {
          data: { id: id },
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
          setCategories(categories.filter(category => category.id !== id));
          toast.success('Xóa danh mục thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch(() => {
          setError("Có lỗi khi xóa danh mục");
          toast.error('Có lỗi khi xóa danh mục!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append('id', formData.id);
    updatedFormData.append('name', formData.name);
    updatedFormData.append('slug', formData.slug);
    updatedFormData.append('description', formData.description);
    if (formData.image) {
      updatedFormData.append('image', formData.image); 
    }

    axios
      .post("http://localhost/quanaonam/DANHMUC/updatecategory.php", updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        const updatedCategories = categories.map((category) =>
          category.id === formData.id ? { ...category, ...formData } : category
        );
        setCategories(updatedCategories);
        setEditingCategory(null);
        setFormData({
          id: '',
          name: '',
          slug: '',
          description: '',
          image: null
        });
        toast.success('Cập nhật danh mục thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch(() => {
        setError("Có lỗi khi cập nhật danh mục");
        toast.error('Có lỗi khi cập nhật danh mục!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="all-categories">
      <h2>Tất cả danh mục</h2>
      {editingCategory ? (
        <form onSubmit={handleSubmit}>
          <h3>Sửa danh mục</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Tên danh mục"
            required
          />
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleFormChange}
            placeholder="Slug"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Mô tả"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*" 
            onChange={handleFormChange}
            required
          />
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => setEditingCategory(null)}>Hủy</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Slug</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Chỉnh sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>{category.description}</td>
                <td>
                  <img src={category.image_url} alt={category.name} width="50" />
                </td>
                <td>
                  <button onClick={() => handleEdit(category)}>Sửa</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(category.id)}>Xóa</button>
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

export default AllCategories;
