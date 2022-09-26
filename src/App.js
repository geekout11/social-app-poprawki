import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DummyData from './pages/DummyData';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import Navbar from './components/Navbar';

function App() {
  const loginFlag = localStorage.getItem('myLocalStorage');
  const [loginGate, setLoginGate] = useState(loginFlag && true);

  return (
    <BrowserRouter>
      <Navbar loginGate={loginGate} setLoginGate={setLoginGate} />
      <Routes>
        <Route path='/' element={<DummyData />} />
        <Route
          path='main'
          element={<Main setLoginGate={setLoginGate} />}
        />
        <Route path='login' element={<Login setLoginGate={setLoginGate} />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
