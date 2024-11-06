// src/App.js
import React from 'react';
import Menutop from "./menutop";
import Menuleft from "./Menuleft";
import SearchResults from './SearchResults';
import Chantrang from "./chantrang";
import '../TRANGCHUCSS/trangchu.css';

function Trangchu() {
  return (
    <div className="trangchu">
      <Menutop />
      <div className="main-content">
        <Menuleft />
        <SearchResults />
      </div>
      <Chantrang />
    </div>
  );
}

export default Trangchu;
