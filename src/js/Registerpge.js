import React from "react";
import Menu from "../component/menu";
import Login from "../component/Login";
import Upload from "../component/Upload";
import Register from "../component/Register";
import bslo from "../img/bslothree.jpg"


const Registers_Form = () => {
    return (
        <div>
            {/* {/* <img src={bslo} alt="login image" className="login_img" /> */} 
            <Menu />
            <Register />
            
        </div>
    );
};

export default Registers_Form