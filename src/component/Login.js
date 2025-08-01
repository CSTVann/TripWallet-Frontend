import React, { useState, useEffect } from 'react';
import { useLogin } from '../js/LoginHandler';
import bslo from '../img/bslothree.jpg'
import login_bg from '../img/login_bg.png'
import { useNavigate } from 'react-router-dom';

import $ from 'jquery'


import '../css/Login.css'



const LoginHandling = () => {
    const navigate = useNavigate();

    const {isLoggedIn, isAdmin, userName, login, logout} = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        var response = await login(email, password);

        if (isLoggedIn) {
          navigate('/')
        } else {
          setWrongLogin(true)
        }

    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isWrongLogin, setWrongLogin] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn, isAdmin]);


    return (
      <body className='body-login'>
        <div className="loginlogin" >
          {/* {/* <img src={bslo} alt="login image" className="login_img" /> */}

          <form onSubmit={handleLogin} className="login__formlogin" style={{ backgroundColor: '#00000070' }}>
              <h1 className="login__title"><b>Trip Wallet</b></h1>

              <div className="login__content">
                <div className="login__box">
                    <i className="ri-user-3-line login__icon"></i>

                    <div className="login__box-input">
                      <input 
                        type="email" 
                        required 
                        className="login__input input-login" 
                        id="login-email" 
                        onChange={handleEmailChange}
                        value={email} 
                        placeholder=" " />
                      <label for="login-email" className="login__label">Email</label>
                    </div>
                </div>

                <div className="login__box">
                    <i className="ri-lock-2-line login__icon"></i>

                    <div className="login__box-input">
                    <input
                      required
                      type={isPasswordVisible ? 'text' : 'password'}
                      className="login__input input-login"
                      id="login-pass"
                      onChange={handlePasswordChange}
                      value={password}
                      placeholder=" "
                    />
                    <label htmlFor="login-pass" className="login__label">
                      Password
                    </label>
                    <i
                        className={`ri-${isPasswordVisible ? 'eye-line' : 'eye-off-line'} login__eye`}
                        onClick={togglePasswordVisibility}
                      ></i>
                  </div>
                </div>
              </div>

              {isWrongLogin && (
                <div>
                  <span className='wrong-password'><b>Wrong Password</b></span>
                </div>
              )}

              {/* <div className="login__check">
                <div className="login__check-group">
                    <input type="checkbox" className="login__check-input input-login" id="login-check" />
                    <label for="login-check" className="login__check-label">Remember me</label>
                </div>

                <a href="#" className="login__forgotlogin">Forgot Password?</a>
              </div> */}

              <button type="submit" className="login__buttonlogin button-login">Login</button>

              <p className="login__registerlogin">
                Don't have an account? <a href='/register' className='a'>Register</a>
              </p>
          </form>
        </div>
      </body>
      );
    
}

const Login = () => {
  return (
      <LoginHandling />
  );
};


export default Login