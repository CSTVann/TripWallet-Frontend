import React from "react";
import '../css/footer_menu.css';
import facebook from '../img/facebook.svg'
import github from '../img/github.svg'
import youtube from '../img/youtube.svg'
import tiktok from '../img/tiktok.svg'

const Footer_menu = () =>{
    return(

        <footer className="nest-footer footer-nest">
            <div className="nest-footer-row">
                <div className="container-top-footer">
                    <h3><b>Trip Wallet</b></h3>
                    <p>The website can analyze your budget for joining a trip by providing the best estimate of both price and the quality of the destination. Whether you are planning a leisure vacation or a business trip.</p>
                    <div>
                        <a href='https://www.facebook.com/profile.php?id=100008341302892'><img src={facebook} className="icon-footer"></img></a>
                        <a href="https://github.com/jingtheanteng"><img src={github} className="icon-footer"></img></a>
                        <a href="https://github.com/jingtheanteng"><img src={youtube} className="icon-footer"></img></a>
                        <a href="https://github.com/jingtheanteng"><img src={tiktok} className="icon-footer"></img></a>
                    </div>
                </div>
            </div>
            <hr className="br-footer"></hr>
            <div className="dev-names">
                <div className="footer-least-one">
                    <div className="nest-developer">
                        <p5>Jingthean Teng</p5>
                        <div className="nest-a-developer">
                            <a href='https://www.facebook.com/profile.php?id=100008341302892'><img src={facebook} className="icon-footer"></img></a>
                            <a href="https://github.com/jingtheanteng"><img src={github} className="icon-footer"></img></a>
                        </div>
                    </div>
                    <div className="nest-developer">
                        <p5>Sotheavann Chhorn</p5>
                        <div className="nest-a-developer">
                            <a href='https://www.facebook.com/profile.php?id=100065175015705'><img src={facebook} className="icon-footer"></img></a>
                            <a href="https://github.com/CSTVann"><img src={github} className="icon-footer"></img></a>
                        </div>
                    </div>
                    <div className="nest-developer">
                        <p5>Sothieliya Thoeun</p5>
                        <div className="nest-a-developer">
                            <a href='https://www.facebook.com/profile.php?id=100005030115710'><img src={facebook} className="icon-footer"></img></a>
                            <a href="https://github.com/aliyathoeun"><img src={github} className="icon-footer"></img></a>
                        </div>
                    </div>
                </div>
                <p className="copyright">Copyright @2024 <span><b><a href="https://www.canva.com/design/DAF5OauNPLM/4ELN1n09reAGwUuJSGn4aA/edit?utm_content=DAF5OauNPLM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Trip Wallet</a></b></span></p>
            </div>
        </footer>

    )
}

export default Footer_menu