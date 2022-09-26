import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Notifications from '../components/Notifications';
import { API } from '../data/Api';
import { SHOW_MSG_TIME } from '../data/Config';

function Login(props) {
  const [inputData, setInputData] = useState({
    login: '',
    pass: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const controlData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const loginAPI = new API('login');
    loginAPI.setData({
      username: inputData.login,
      password: inputData.pass,
      ttl: 3600,
    });
    loginAPI.getData(handleAPIAnswer);
  };

  const handleAPIAnswer = (res) => {
    console.log(res);
    if (res.data.error || res.status !== 200) {
      setErrorMsg('Wrong login or password');
      setTimeout(() => setErrorMsg(''), SHOW_MSG_TIME);
    } else {
      setSuccessMsg('Successfully logged in');
      setTimeout(() => setSuccessMsg(''), SHOW_MSG_TIME);

      const { username, jwt_token: jwtToken } = res.data;
      localStorage.setItem(
        'myLocalStorage',
        JSON.stringify({ username, jwtToken })
      );
      props.setLoginGate(true);
      navigate('/');
    }
  };

  return (
    <div className="login-container ">
      <div className="login-wrapper">
        <div className="login-right">
          <form onSubmit={submitLogin}>
            <div className="login-box">
              <input type="text" name="login" placeholder="Username" className="login-input" onChange={controlData} required />
              <input type="password" name="pass" placeholder="Password" className="login-input" onChange={controlData} required />
              <button type="submit" className="login-button">Login</button>
              <button className="login-register-button" onClick={() => { navigate('../register') }}>Create Account</button>
            </div>
          </form>
          {successMsg || errorMsg && <Notifications successMsg={successMsg} errorMsg={errorMsg}/>}
        </div>
      </div>
    </div>
  )
}

export default Login;
