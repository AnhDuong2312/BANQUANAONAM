import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../TRANGCHUCSS/categoryproduct.css';

function CategoryProduct() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost/quanaonam/TRANGCHU/get_products_by_category.php', {
          params: { category_id: categoryId },
        });
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get('http://localhost/quanaonam/TRANGCHU/get_categories.php', {
          params: { category_id: categoryId },
        });

        console.log("Dữ liệu từ API tên danh mục:", response.data); 

        if (response.data && response.data.name) {
          setCategoryName(response.data.name); // Cập nhật categoryName
        } else {
          setCategoryName('Danh mục không tồn tại');
        }

      } catch (err) {
        setError('Lỗi khi tải tên danh mục');
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
      fetchCategoryName();
    }
  }, [categoryId]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-product">
    
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
            <a href={`/product/${product.id}`}>
                
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <div className="center">
              <p>{product.small_description}</p>
              <p><strong>Giá bán:</strong> {product.selling_price}0₫</p>
              </div>
              <button>Mua ngay</button>
            </a>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProduct;
