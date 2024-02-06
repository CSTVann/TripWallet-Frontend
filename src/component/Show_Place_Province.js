import React, { useState, useEffect } from 'react';
import '../css/Show_Place_Province.css'
import landscape1 from '../img/landscape1.png'
import datacate from "../json/Category.json"

import $ from 'jquery'

var CONFIG = require('../conf.json')

function Show_Place_Province() {

    const [data, setData] = useState([]);

    async function getLocationData() {
        var filter = JSON.parse(localStorage.getItem('filter'))
        var useFilter = false;

        if (filter['categories'].length || 
            filter['locations'].length || 
            filter['minBudget'] || 
            filter['maxBudget']) {
                useFilter = true
            }
        if (useFilter) {
            try {
                const response = await $.ajax({
                    url: `${CONFIG.ip}:${CONFIG.port}/province/data/filtered`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        filter: filter
                    }),
                });
                
                if (response.status) {
                    setData(response.data);
                    // window.location.reload();
                }
                return response
            } catch (error) {
                console.error('Something Went Wrong:', error);
                // setIsLoggedIn(false);
            }
        } else {
            $.ajax({
                url: `${CONFIG.ip}:${CONFIG.port}/province/data`,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    // Update state with fetched data
                    setData(response.data);
                    // if (response) console.log(response.categories)
                },
                error: function (error) {
                    console.error('Error:', error);
                },
            });
        }
        
    }

    useEffect(() => {
        getLocationData();
    }, []); 


    return  (
        <article>
            <div>
                {data.map((line) => (
                    <div className="nest-beach-boxshow">
                        <div>
                            <h4 className="main-caption caption-category">{line.province.name}</h4>
                        </div>
                        <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target={`#botton-1-${line.province.id}`} type="button" role="tab" aria-controls="pills-home" aria-selected="true">Place</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target={`#botton-2-${line.province.id}`} type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Accommodation</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target={`#botton-3-${line.province.id}`} type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Transportation</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id={`botton-1-${line.province.id}`} role="tabpanel" aria-labelledby={`${line.province.id}-pills-home-tab`}>
                                
                                <div className="show-category">
                                    {line.place.map((item) => (
                                        <div className="card cardc" style={{ width: '18rem' }}>
                                            <img src={item.image_url || item.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p>Budget: ${item.price}</p>
                                                <p className="card-text">{item.detail}</p>
                                                
                                            </div>
                                        </div>
                                    ))}
                                
                                </div>

                            </div>
                            <div className="tab-pane fade" id={`botton-2-${line.province.id}`} role="tabpanel" aria-labelledby="pills-profile-tab">

                                <div className="show-category">
                                    {line.accomodation.map((acco_item) => (
                                        <div className="card cardc" style={{ width: '18rem' }}>
                                            <img src={acco_item.image_url || acco_item.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{acco_item.name}</h5>
                                                <p>Budget: ${acco_item.price}</p>
                                                <p className="card-text">{acco_item.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            <div className="tab-pane fade" id={`botton-3-${line.province.id}`} role="tabpanel" aria-labelledby="pills-contact-tab">
                                
                                <div className="show-category">
                                    {line.transportation.map((trnp_item) => (
                                        <div className="card cardc" style={{ width: '18rem' }}>
                                            <img src={trnp_item.image_url || trnp_item.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{trnp_item.name}</h5>
                                                <p>Budget: $ {trnp_item.price}</p>
                                                <p className="card-text">{trnp_item.detail}$</p>
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </article>
    )
}

export default Show_Place_Province
