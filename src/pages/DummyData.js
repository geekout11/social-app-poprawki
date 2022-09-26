import React, { useEffect, useState } from 'react';
import './DummyData.css';
import { useNavigate } from 'react-router-dom';

function DummyData() {
  const navi = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('myLocalStorage'));

    if (userData) {
      const { jwtToken } = userData;
      navi('home', { state: { jwtToken: jwtToken } });
    } else {
      navi('main');
    }
  });

  return <div></div>;
}

export default DummyData;
