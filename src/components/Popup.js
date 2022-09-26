import React, { useEffect, useState } from 'react';
import './Popup.css';
import Login from '../pages/Login';

function Popup({ setLoginGate }, props) {

  return (
    <div className="popup-cont">
      <div className="popup-inner">
        <button className="close-btn">
          x
        </button>
        <Login setLoginGate={setLoginGate}  />
      </div>
    </div>
  );

}

export default Popup;
