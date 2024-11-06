import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState} from 'react';
import Login from '../LOGIN/login';
import Register from '../LOGIN/register';
import Admin from '../ADMIN/admin';

import Trangchu from '../TRANGCHU/trangchu';
import ProductDetails from '../TRANGCHU/ProductDetails';
import ProductCategory from '../TRANGCHU/ProductCategory';
import ProtectedRoute from '../ROUTER/ProtectedRoute';
import AccountPage from '../TRANGCHU/AccountPage';
import Cart from '../TRANGCHU/Cart';
import TrangChuSearch from '../TRANGCHU/TrangChuSearch';
import GioiThieu from '../TRANGCHU/GioiThieu';
import LienHe from '../TRANGCHU/LienHe';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Trangchu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/product/:id" element={<ProductDetails />} />       
        <Route path="/products/:categoryId" element={<ProductCategory />} /> 
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        
        <Route 
               path="/admin" 
                  element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                  } 
        />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<TrangChuSearch />} />         
        <Route path="/gioithieu" element={<GioiThieu />} /> 
        <Route path="/lienhe" element={<LienHe />} />    
      </Routes>
    </Router>
  );
}

export default App;
