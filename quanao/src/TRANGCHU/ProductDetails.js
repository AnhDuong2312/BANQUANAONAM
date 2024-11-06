import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menutop from "../TRANGCHU/menutop";
import Chantrang from "../TRANGCHU/chantrang";
import '../TRANGCHUCSS/productdetail.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const [selectedSize, setSelectedSize] = useState('S'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    setIsLoggedIn(!!token); 

    if (!token) {
      toast.warn('Bạn cần đăng nhập để xem sản phẩm.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      navigate('/login'); 
      return;
    }

    axios.get(`http://localhost/quanaonam/TRANGCHU/get_product_detail.php?id=${id}`)
      .then(response => {
        if (response.data && !response.data.error) {
          setProduct(response.data); 
          localStorage.setItem('productId', id); 
        } else {
          setError(response.data.error || 'Lỗi khi tải chi tiết sản phẩm.'); 
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("API error:", error);
        setError('Lỗi khi kết nối với API.'); 
        setLoading(false); 
      });
  }, [id, navigate]);

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>; 
  if (error) return <p>{error}</p>; 

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value)); 
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const userId = localStorage.getItem('userId'); 
      const cartItem = {
        user_id: userId, 
        product_id: id, 
        product_name: product.name, 
        product_image: product.image, 
        size: selectedSize, 
        quantity: quantity, 
        price: product.selling_price 
      };

      console.log(cartItem); 

      axios.post('http://localhost/quanaonam/BUY-CART/add_to_cart.php', cartItem)
        .then(response => {
          console.log(response.data); 
          if (response.data.success) {
            toast.success(response.data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          }
        })
        .catch(error => {
          console.error("API error:", error);
          toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      toast.warn('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      const userId = localStorage.getItem('userId'); 
      const orderItem = {
        user_id: userId, 
        product_id: id, 
        product_name: product.name, 
        product_image: product.image, 
        size: selectedSize, 
        quantity: quantity, 
        price: product.selling_price 
      };

      console.log(orderItem); 

      axios.post('http://localhost/quanaonam/BUY-CART/buyProduct.php', orderItem)
        .then(response => {
          console.log(response.data); 
          if (response.data.success) {
            toast.success(response.data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          }
        })
        .catch(error => {
          console.error("API error:", error);
          toast.error("Lỗi khi mua sản phẩm .", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      toast.warn('Bạn cần đăng nhập để mua sản phẩm.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      setTimeout(() => {
        navigate('/login'); 
      }, 3000);
    }
  };

  return (
    <div className="detail">
      <Menutop />
      <div className="product-details">
        {product ? (
          <>
            {product.image ? (
              <img src={product.image} alt={product.name} className="product-image_detail" />
            ) : (
              <p>Không có ảnh sản phẩm.</p>
            )}
            <div className="three-image">
              <img src={product.image} alt={product.name} className="three" />
              <img src={product.image} alt={product.name} className="three" />
              <img src={product.image} alt={product.name} className="three" />
            </div>
            <div className="product-content">
              <h2>{product.name || 'Tên sản phẩm không có'}</h2>
              <div className="size-selection">
                <p><b>Kích thước:</b></p>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="quantity-selection">
                <p><b>Số lượng:</b></p>
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <p><b>Giá bán:</b> {product.selling_price ? `${product.selling_price}₫` : 'Chưa có giá bán.'}</p>
              <div className="action-buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ</button>
                <button className="buy-now" onClick={handleBuyNow}>Mua ngay</button>
              </div>
              <div className="description_product">
                <p><b>Mô tả ngắn:</b> {product.small_description || 'Không có mô tả ngắn.'}</p>
                <p><b>Mô tả chi tiết:</b> <br /> {product.description || 'Không có mô tả chi tiết.'}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Không tìm thấy sản phẩm.</p>
        )}
      </div>
      <Chantrang />
      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
