import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../data/Api';

function Nav(props) {
  let navigate = useNavigate();

  const logout = () => {
    const { jwtToken } = JSON.parse(localStorage.getItem('myLocalStorage'));
    const logoutAPI = new API('logout', jwtToken);
    logoutAPI.getData(handleAPIAnswer);
  };

  const handleAPIAnswer = (res) => {
    props.setLoginGate(false);
    localStorage.removeItem('myLocalStorage');
    navigate('/');
  };

  return (
    <nav className="navbar-container">
    <h2 onClick={() => navigate('/')}>SocialApp</h2>
    <div className="navbar-wrapper">
        <ul>
            <li onClick={() => navigate('/')} className="navbar-icon-item" to={'home'}>
                Home
            </li>
            {props.loginGate || (
                <li onClick={() => navigate('login')} className="navbar-icon-item" to={'login'}>
                    Login
                </li>
            )}
            {props.loginGate || (
                <li onClick={() => navigate('register')} className="navbar-icon-item" to={'register'}>
                    Register
                </li>
            )}
            {props.loginGate && (
                <li onClick={logout} className="navbar-icon-item">
                    Logout
                </li>
            )}
        </ul>
    </div>
</nav>
  );
}

export default Nav;
