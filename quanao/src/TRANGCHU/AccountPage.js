import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TRANGCHUCSS/accoutpage.css';

function AccountPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); 
            return; 
        }

        
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost/quanaonam/TRANGCHU/get_user_info.php', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await response.json();
                if (data.success) {
                    setUserInfo(data.data); 
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        navigate('/'); 
    };

    if (!userInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="account-page">
            <h2>Thông tin tài khoản</h2>
            <p>Tên người dùng: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Số điện thoại: {userInfo.phone}</p>
            <p>Địa chỉ: {userInfo.address}</p>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
}

export default AccountPage;
