import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { checkPassword, removeWhiteSpaces } from '../data/Tools';
import { API } from '../data/Api';
import { WRONG_PASS_MSG, DIFF_PASS_MSG, SHOW_MSG_TIME } from '../data/Config';
import Notifications from '../components/Notifications';

function Register() {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    pass: '',
    passControl: '',
  });

  // const [msg, setMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navi = useNavigate();

  const controlData = (e) => {
    const name = e.target.name;
    let val = e.target.value;
    if (name === 'name') val = removeWhiteSpaces(val);

    setInputData({
      ...inputData,
      [name]: val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;

    if (inputData.pass !== inputData.passControl) {
      flag = false;
      setErrorMsg(DIFF_PASS_MSG);
    }

    if (!checkPassword(inputData.pass)) {
      flag = false;
      setErrorMsg(WRONG_PASS_MSG);
    }

    if (flag) {
      const registerAPI = new API('signup');
      registerAPI.setData({
        username: inputData.name,
        email: inputData.email,
        password: inputData.pass,
      });
      registerAPI.getData(handleAPIAnswer);
    }
  };

  const handleAPIAnswer = (res) => {
    setSuccessMsg(
      `${res.data.signedup
        ? 'Congratulations, You have a new account!'
        : Object.values(res.data.message)[0][0]
      }`
    );

    setTimeout(() => {
      setSuccessMsg('');
      if (res.data.signedup) navi('/login')
    }, SHOW_MSG_TIME);
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-left">
          <h3 className="register-logo">SocialApp</h3>
        </div>
        <div className="register-right">
          <form onSubmit={handleSubmit}>
            <div className="register-box">
              <input type="text" name="name" placeholder="Username" className="register-input" minLength={4} value={inputData.name} onChange={controlData} required />
              <input type="email" name="email" placeholder="E-mail" className="register-input" onChange={controlData} required />
              <input type="password" name="pass" placeholder="Password" className="register-input" onChange={controlData} required />
              <input type="password" name="passControl" placeholder="Confirm password" className="register-input" onChange={controlData} required />
              <button type="submit" className="register-button">Register</button>
              {successMsg || errorMsg && <Notifications errorMsg={errorMsg} successMsg={successMsg} />}
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Register;
