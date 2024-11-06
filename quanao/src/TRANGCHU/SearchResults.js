// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../TRANGCHUCSS/dssanpham.css';

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; 

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`http://localhost/quanaonam/TRANGCHU/search_products.php?query=${query}`)
        .then(response => {
          setSearchResults(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Đã có lỗi xảy ra khi lấy kết quả tìm kiếm!", error);
          setError("Lỗi khi tải kết quả tìm kiếm.");
          setLoading(false);
        });
    }
  }, [query]);

  // Xử lý phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(searchResults.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Đang tải kết quả tìm kiếm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="dssanpham">
      <div className="all">
        <h2>Kết quả tìm kiếm cho: "{query}"</h2>
        <div className="products">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
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
            <p>Không tìm thấy sản phẩm nào phù hợp.</p>
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

export default SearchResults;
