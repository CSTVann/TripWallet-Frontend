import React from "react";
import '../css/profile.css';
import { useLogin } from '../js/LoginHandler';
import btb from '../img/battambang.jpg'


function Profile(props) {

    var storedUser = JSON.parse(localStorage.getItem('user'))

    const {userName, email} = useLogin();


    return  (props.trigger) ? (
        <div className="popup">
            <div className="second-popup">
                {/* <img src={btb} className="image-of-profile"></img> */}
                <h3 className="username">{userName || storedUser.name}</h3>
                <p className="email">{storedUser.email || email}</p>
                <div className="popup-inner">
                    {props.children}
                </div>
            </div>
        </div>
    ) : "";
}


export default Profile;