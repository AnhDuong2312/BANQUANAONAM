import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../TRANGCHUCSS/Cart.css';
import Menutop from './menutop';
import Chantrang from './chantrang';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [cartMessage, setCartMessage] = useState(''); 
    const [orderMessage, setOrderMessage] = useState(''); 
    const userId = localStorage.getItem("userId");
    
    useEffect(() => {
        fetchCartItems();
    }, [userId]);

    useEffect(() => {
        fetchOrderItems();
    }, [userId]);

    const fetchCartItems = () => {
        if (userId) {
            axios.get(`http://localhost/quanaonam/BUY-CART/getCart.php?user_id=${userId}`)
                .then((response) => {
                    if (response.data.data) {
                        setCartItems(response.data.data);
                        setCartMessage('');
                    } else {
                        setCartMessage(response.data.message);
                        setCartItems([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching cart items", error);
                    toast.error('Đã có lỗi xảy ra khi tải giỏ hàng.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeButton: false,
                    });
                });
        } else {
            setCartMessage("Không tìm thấy user_id trong localStorage.");
        }
    };

    const handleDelete = (productId) => {
        if (!userId || !productId) {
            toast.error("Thông tin người dùng hoặc sản phẩm không hợp lệ.", {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
            return;
        }

        axios.post(`http://localhost/quanaonam/BUY-CART/deleteCartItem.php`, {
            userId: userId,
            productId: productId
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                fetchCartItems();
                toast.success('Sản phẩm đã được xóa thành công!', {
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
        .catch((error) => {
            console.error("Error deleting cart item", error);
            toast.error('Đã có lỗi xảy ra khi xóa sản phẩm.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        });
    };

    const fetchOrderItems = () => {
        if (userId) {
            axios.get(`http://localhost/quanaonam/BUY-CART/getOrder.php?user_id=${userId}`)
                .then((response) => {
                    if (response.data.data) {
                        setOrderItems(response.data.data);
                        setOrderMessage('');
                    } else {
                        setOrderMessage(response.data.message);
                        setOrderItems([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching order items", error);
                    toast.error('Đã có lỗi xảy ra khi tải danh sách đã mua.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeButton: false,
                    });
                });
        } else {
            setOrderMessage("Không tìm thấy user_id trong localStorage.");
        }
    };

    const handleOrderDelete = (productId) => {
        if (!userId || !productId) {
            toast.error("Thông tin người dùng hoặc sản phẩm không hợp lệ.", {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
            return;
        }

        axios.post(`http://localhost/quanaonam/BUY-CART/deleteBuy.php`, {
            userId: userId,
            productId: productId
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                fetchOrderItems();
                toast.success('Sản phẩm đã được xóa thành công!', {
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
        .catch((error) => {
            console.error("Error deleting order item", error);
            toast.error('Đã có lỗi xảy ra khi xóa sản phẩm.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        });
    };

    return (
        <div className="cart-home">
            <Menutop />
            <div className="cart-content">
                <div className="cart-container">
                    <h2>Giỏ Hàng</h2>
                    {cartMessage ? (
                        <p>{cartMessage}</p>
                    ) : (
                        <ul className="cart-items-list">
                            {cartItems.map((item) => (
                                <li key={item.product_id} className="cart-item">
                                    <img src={item.product_image} alt={item.product_name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.product_name}</h3>
                                        <p>Kích thước: {item.size}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                        <p>Giá: {item.price} VND</p>
                                    </div>
                                    <button 
                                        className="cancel-button" 
                                        onClick={() => handleDelete(item.product_id)}
                                    >
                                        Hủy
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="cart-container">
                    <h2>Hàng bạn đã mua</h2>
                    {orderMessage ? (
                        <p>{orderMessage}</p>
                    ) : (
                        <ul className="cart-items-list">
                            {orderItems.map((item) => (
                                <li key={item.product_id} className="cart-item">
                                    <img src={item.product_image} alt={item.product_name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.product_name}</h3>
                                        <p>Kích thước: {item.size}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                        <p>Giá: {item.price} VND</p>
                                    </div>
                                    <button 
                                        className="cancel-button" 
                                        onClick={() => handleOrderDelete(item.product_id)}
                                    >
                                        Hủy
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <ToastContainer />
            <Chantrang />
        </div>
    );
}

export default Cart;
