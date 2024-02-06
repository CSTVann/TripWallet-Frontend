import React, { Component } from "react";

import '../css/banner.css';
import Slider from 'react-slick';
import battambang from '../img/battambang.jpg';
import Beaches from '../img/beaches.jpg';
import angkor from '../img/angkor_wat.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import landscape1 from '../img/landscape1.png';


export default class SimpleSlider extends Component {
  
  render() {
    const settings = {
      dots: true,
      arrows: true,
      autoplay: true,
      infinite: true,
      speed: 1500,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
   
    return (
        <div style={{overflow: "hidden"}}>
            <Slider {...settings}>
                <div className="banner-item">
                  <div className="nest-item-banner">
                    <div className="neest-handp">
                      <span className="nesth3">
                        <h3 className="h3"><b>Trip &</b></h3>
                        <h3 className="h3"><b>Budget to</b></h3>
                        <h3 className="h3 h3-types"><b>Temple</b></h3>
                      </span>
                      <span className="nestp">
                        <p className="p">Trip Analysis budget with</p>
                        <p className="p">Recommendation</p>
                        <p className="p">for the best place to visit.</p>
                      </span>
                    </div>
                    <div className="div-img">
                      <img src={angkor}></img>
                    </div>
                  </div>
                </div>
                <div className="banner-item">
                  <div className="nest-item-banner">
                    <div className="neest-handp">
                      <span className="nesth3">
                        <h3 className="h3"><b>Trip &</b></h3>
                        <h3 className="h3"><b>Budget to</b></h3>
                        <h3 className="h3 h3-types"><b>Beaches</b></h3>
                      </span>
                      <span className="nestp">
                        <p className="p">Trip Analysis budget with</p>
                        <p className="p">Recommendation</p>
                        <p className="p">for the best place to visit.</p>
                      </span>
                    </div>
                    <div className="div-img">
                      <img src={Beaches}></img>
                    </div>
                  </div>
                </div>
                <div className="banner-item">
                  <div className="nest-item-banner">
                    <div className="neest-handp">
                      <span className="nesth3">
                        <h3 className="h3"><b>Trip &</b></h3>
                        <h3 className="h3"><b>Budget to</b></h3>
                        <h3 className="h3 h3-types"><b>Cities</b></h3>
                      </span>
                      <span className="nestp">
                        <p className="p">Trip Analysis budget with</p>
                        <p className="p">Recommendation</p>
                        <p className="p">for the best place to visit.</p>
                      </span>
                    </div>
                    <div className="div-img">
                      <img src={battambang}></img>
                    </div>
                  </div>
                </div>
            </Slider>
        </div>
    );
    }
};

// export default Banner;
