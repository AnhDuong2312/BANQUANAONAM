import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/addcategory.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost/quanaonam/DANHMUC/addcategory.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success('Danh mục đã được thêm thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      } else {
        toast.error('Có lỗi xảy ra khi thêm danh mục!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      toast.error('Có lỗi xảy ra khi kết nối với server.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
    }

    setCategoryName("");
    setSlug("");
    setDescription("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-category">
      <h2>Thêm danh mục mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên danh mục:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Nhập tên danh mục"
            required
          />
        </div>

        <div>
          <label>Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập slug"
            required
          />
        </div>

        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" required />
        </div>

        <div className="submit">
          <button type="submit">Thêm danh mục</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddCategory;
