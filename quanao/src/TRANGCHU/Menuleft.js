import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../TRANGCHUCSS/menuleft.css';

function Menuleft() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost/quanaonam/TRANGCHU/get_categories.php") 
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  return (
    <aside className="menuleft">
      <h2>Danh Mục</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/products/${category.id}`}>{category.name}</Link> {/* Sử dụng Link để điều hướng */}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Menuleft;
