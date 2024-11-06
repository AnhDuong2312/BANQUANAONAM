// src/App.js
import React from 'react';
import Menutop from "./menutop";
import Menuleft from "./Menuleft";
import Dssanpham from "./dssanpham";
import Chantrang from "./chantrang";
import '../TRANGCHUCSS/trangchu.css';

function Trangchu() {
  return (
    <div className="trangchu">
      <Menutop />
      <div className="main-content">
        <Menuleft />
        <Dssanpham />
      </div>
      <Chantrang />
    </div>
  );
}

export default Trangchu;
