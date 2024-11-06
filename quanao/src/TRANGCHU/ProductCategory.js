// src/App.js
import React from 'react';
import Menutop from "./menutop";
import Menuleft from "./Menuleft";
import CategoryProduct from './CategoryProduct';
import Chantrang from "./chantrang";
import '../TRANGCHUCSS/trangchu.css';


function Trangchu() {
  return (
    <div className="trangchu">
      <Menutop />
      <div className="main-content">
        <Menuleft />
        <CategoryProduct/>
      </div>
      <Chantrang />
    </div>
  );
}

export default Trangchu;
