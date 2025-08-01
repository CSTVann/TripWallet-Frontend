import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import bslo from '../img/bslo.jpg'
import React from "react";

import '../css/Register.css';
import login_bg from '../img/login_bg.png'
import { useLogin } from '../js/LoginHandler';



const Register = () => {

    const navigate = useNavigate();

    const [RegUserName, setRegUserName] = useState('');
    const [RegEmail, setRegEmail] = useState('');
    const [RegPassword, setRegPassword] = useState('');
    const [RegConfirmPassword, setRefConfirmPassword] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisibles, setIsPasswordVisibles] = useState(false);
    
    const [isPasswordUnmatch, setIsPasswordUnmatch] = useState(false);
    const [isCannotLogin, setIsCannotLogin] = useState(false);

    const handleRegUserNameChange = (e) => setRegUserName(e.target.value);
    const handleRegEmailChange = (e) => setRegEmail(e.target.value);
    const handleRegPasswordChange = (e) => setRegPassword(e.target.value);
    const handleRegConfirmPasswordChange = (e) => {
        setRefConfirmPassword(e.target.value)
        if (RegConfirmPassword !== RegConfirmPassword) {
            setIsPasswordUnmatch(true);
        } else {
            setIsPasswordUnmatch(false);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const togglePasswordVisibilitys = () => {
        setIsPasswordVisibles(!isPasswordVisibles);
    };

    
    const { 
      isLoggedIn, 
      isAdmin, 
      userName, 
      email, 
      password, 
      login, 
      logout,
      register } = useLogin();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (RegPassword !== RegConfirmPassword) {
          setIsPasswordUnmatch(true);
          return;
        } else {
          setIsPasswordUnmatch(false);
        }
        var response  = await register(RegUserName, RegEmail, RegPassword);
        
        if (response.status) {
          navigate('/login')
        } else {
          setIsCannotLogin(true)
        }


    };


    useEffect(() => {
        if (isLoggedIn) navigate('/login')
    }, [isLoggedIn, isAdmin, isPasswordUnmatch, RegPassword, RegConfirmPassword]);

    return (
        <body className='body-login'>
          <div className="loginlogin">
            {/* {/* <img src={bslo} alt="login image" className="login_img" /> */}
            <form onSubmit={handleRegister} className="login__formlogin" style={{ backgroundColor: '#00000070' }}>
                <h1 className="login__title">Register</h1>

                
                <div className="login__content">
                  <div className="login__box">
                        <i className="ri-user-3-line login__icon"></i>
    
                        <div className="login__box-input">
                          <input 
                              type="text" 
                              required 
                              className="login__input input-login" 
                              id="login-name"
                              onChange={handleRegUserNameChange}
                              value={RegUserName}
                              placeholder=" " />
                          <label for="login-email" className="login__label">Username</label>
                        </div>
                  </div>
                  <div className="login__box">
                        <i className="ri-user-3-line login__icon"></i>
    
                        <div className="login__box-input">
                          <input 
                              type="email" 
                              required 
                              className="login__input input-login" 
                              onChange={handleRegEmailChange}
                              value={RegEmail}
                              id="login-email" 
                              placeholder=" " />
                          <label for="login-email" className="login__label">Email</label>
                        </div>
                  </div>

                <div className="login__box">
                      <i className="ri-lock-2-line login__icon"></i>
  
                      <div className="login__box-input">
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        required
                        className="login__input input-login"
                        id="login-pass"
                        onChange={handleRegPasswordChange}
                        value={RegPassword}
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
  
                <div className="login__box">
                      <i className="ri-lock-2-line login__icon"></i>
  
                      <div className="login__box-input">
                      <input
                        type={isPasswordVisibles ? 'text' : 'password'}
                        required
                        className="login__input input-login"
                        id="login-confirm-pass"
                        onChange={handleRegConfirmPasswordChange}
                        value={RegConfirmPassword}
                        placeholder=" "
                      />
                      <label htmlFor="login-pass" className="login__label">
                        Confirm-Password
                      </label>
                      <i
                        className={`ri-${isPasswordVisibles ? 'eye-line' : 'eye-off-line'} login__eye`}
                        onClick={togglePasswordVisibilitys}
                      ></i>
                    </div>
                  </div>
                  
                </div>
  
                {/* <div className="w-100" style={{textAlign: 'center',}}>
                 
                  {isPasswordUnmatch ? (
                          <p className="" style={{fontSize: '12px'}}>Password and Confirm-Password Unmatched</p>
                      ) : (
                          <p className=""><t className="fa fa-user"/></p>
                      )
                  }
                </div> */}
                {isPasswordUnmatch && (
                  <div className="confirm-pass-center">
                    <span className="confirm-password" style={{fontSize: '12px'}}><b>Password and Confirm-Password Unmatched</b></span>
                  </div>
                )}
                {!isPasswordUnmatch && isCannotLogin && (
                  <div className="confirm-pass-center">
                    <span className="confirm-password" style={{fontSize: '12px'}}><b>Email already exist.</b></span>
                  </div>
                )}
  
                <button type="submit" className="login__buttonlogin button-login">Register</button>
  
                <p className="login__registerlogin">
                  Don't have an account? <a href='/login' className='a'>Login</a>
                </p>
            </form>
          </div>
        </body>
    );
}


export default Register