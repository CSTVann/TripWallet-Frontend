import React from 'react';
import '../css/category.css';
import landscape1 from '../img/landscape1.png';
import angkor_wat from '../img/angkor_wat.jpg';
import phnom_penh from '../img/download.jpeg'
import battambang from '../img/battambang.jpeg'
import kompot from '../img/kompot.jpeg'
import jsondata from '../json/Recommendation.json'
import { Link } from 'react-router-dom';

const City_Recommend = () => {

    const data = jsondata.recommend;

    return (
        <article className="root">
            <div className="nest-beach-boxshow">
                <div>
                    <h4 className="main-caption caption-category"><b>Recommendation City in Cambodia</b></h4>
                </div>
                <div className="show-category">
                    {data.map(item => (
                        <Link to={item.url} target='_blank'>
                            <div className="card cardr" style={{ width: '18rem' }} >
                                <div key={item.id}>
                                    <img src={item.image} className="card-img-top" alt={item.title} style={{ width: '18rem' }}/>
                                    <div className="card-body">
                                        <h5 className="card-title"><b>{item.title}</b></h5>
                                        <h6><b>{item['sub-title']}</b></h6>
                                        <p className="card-text">{item.infor}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default City_Recommend;
