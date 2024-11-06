import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../TRANGCHUCSS/dssanpham.css';
import { Link } from 'react-router-dom';

function Dssanpham() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButtons, setShowButtons] = useState(false); 
  const productsPerPage = 16;

  const slides = [
    { image: 'https://tse1.mm.bing.net/th?id=OIP.0JNAy2p6lmMyfXpfFoOcbwHaDF&pid=Api&P=0&h=220', link: '' },
    { image: 'https://tse2.mm.bing.net/th?id=OIP.vhUUa1cH0wnJbtVbqPMzdQHaE6&pid=Api&P=0&h=220', link: '' },
    { image: 'https://tse2.mm.bing.net/th?id=OIP.SLqDp8JZD0ulnJXfdfyIVgHaE9&pid=Api&P=0&h=220', link: '' },
    { image: 'https://tse2.mm.bing.net/th?id=OIP.SLqDp8JZD0ulnJXfdfyIVgHaE9&pid=Api&P=0&h=220', link: '' },
  ];

  useEffect(() => {
    axios.get('http://localhost/quanaonam/TRANGCHU/get_products.php')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi khi tải sản phẩm.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 3000ms = 3 giây

    return () => clearInterval(interval); 
  }, [slides.length]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="dssanpham">
      <div
        className="slider-container"
        onMouseEnter={() => setShowButtons(true)} 
        onMouseLeave={() => setShowButtons(false)} 
      >
        {showButtons && (
          <button className="slider-btn prev" onClick={prevSlide}>&lt;</button>
        )}
        <a href={slides[currentSlide].link} target="_blank" rel="noopener noreferrer">
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="slide-image"
          />
        </a>
        {showButtons && (
          <button className="slider-btn next" onClick={nextSlide}>&gt;</button>
        )}
      </div>

      <div className="all">
      <h2>Tất cả sản phẩm</h2>
      <div className="products">
        
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            product.id ? (
              <div key={product.id} className="product">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  <div className="center">
                    <p>{product.small_description}</p>
                    <p><b>Giá bán:</b> {product.selling_price}0<i>₫</i></p>
                  </div>
                  <button>Mua ngay</button>
                </Link>
              </div>
            ) : (
              <p key={product.id}>Sản phẩm không có ID.</p>
            )
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Trang trước</button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Trang sau</button>
      </div>
      </div>
    </main>
  );
}

export default Dssanpham;
