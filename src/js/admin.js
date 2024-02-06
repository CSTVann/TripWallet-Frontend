import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogin } from '../js/LoginHandler';
import '../css/admin.css';
import { useState, useEffect } from 'react';
import $ from 'jquery'


import Menu from "../component/menu";

var CONFIG = require('../conf.json')

const Admin = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [accomodations, setAccomodations] = useState([]);
    const [places, setPlaces] = useState([]);
    const [transportations, setTransportations] = useState([]);
    

    function getCategories() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/category`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setCategories(response.categories);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    function getLocations() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/province`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setLocations(response.provinces);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    function getPlaces() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/place`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setPlaces(response.places);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    function getAccomodations() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/accomodation`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setAccomodations(response.accomodations);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    function getTransportations() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/transportation`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setTransportations(response.transportations);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    async function create(table, data) {
        try {
            const response = await $.ajax({
                url: `${CONFIG.ip}:${CONFIG.port}/${table}/create`,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
            });
            
            if (response.status) {
                window.location.reload();
            }
            return response.status
        } catch (error) {
            console.error('Something Went Wrong:', error);
            // setIsLoggedIn(false);
        }
    }
    async function write(table, data) {
        try {
            const response = await $.ajax({
                url: `${CONFIG.ip}:${CONFIG.port}/${table}/write`,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
            });
            
            if (response.status) {
                window.location.reload();
            }
            return response.status
        } catch (error) {
            console.error('Something Went Wrong:', error);
            // setIsLoggedIn(false);
        }
    }
    async function unlink(table, data) {
        try {
            const response = await $.ajax({
                url: `${CONFIG.ip}:${CONFIG.port}/${table}/unlink`,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
            });
            
            if (response.status) {
                window.location.reload();
            }
            return response.status
        } catch (error) {
            console.error('Something Went Wrong:', error);
            // setIsLoggedIn(false);
        }
    }

    function handleEditCategory(e) {
        e.preventDefault()
        
        var dataset = e.target.dataset;
        var $form = $('.category-form')

        $form.find('#id').val(dataset.id);
        $form.find('#name').val(dataset.name);
        $form.find('#detail').val(dataset.detail);
        $form.find('#image').val(dataset.image);
    }
    function submitCreateEditCategory(e) {
        e.preventDefault()
        var $form = $('.category-form')
        const isCreate = $form.find('#id').val() ? false: true
        var data = {
            name: $form.find('#name').val(),
            detail: $form.find('#detail').val(),
            image: "",
            image_url: $form.find('#image').val()
        }
        if (isCreate) {
            create('category', data)
        } else {
            data['id'] = $form.find('#id').val()
            write('category', data)
        }
    }
    function handleDeleteCategory(e) {
        e.preventDefault()
        const data = {
            id: e.target.dataset.id
        }
        unlink('category', data)
        
    }
    function submitCreateEditlocation(e) {
        e.preventDefault()
        var $form = $('.location-form')
        const isCreate = $form.find('#id').val() ? false: true
        var data = {
            name: $form.find('#name').val(),            
        }
        if (isCreate) {
            create('province', data)
        } else {
            data['id'] = $form.find('#id').val()
            write('province', data)
        }
    }
    function handleDeleteLocation(e) {
        e.preventDefault()
        const data = {
            id: e.target.dataset.id
        }
        unlink('province', data)
        
    }
    function handleEditlocation(e) {
        e.preventDefault()
        
        var dataset = e.target.dataset;
        var $form = $('.location-form')

        $form.find('#id').val(dataset.id);
        $form.find('#name').val(dataset.name);
    
    }

    // ===Place===
    function handleEditPlace(e) {
        e.preventDefault()
        
        var dataset = e.target.dataset;
        var $form = $('.place-form')

        $form.find('#id').val(dataset.id);
        $form.find('#name').val(dataset.name);
        $form.find('#price').val(dataset.price);
        $form.find('#province_id').val(dataset.province_id);
        $form.find('#detail').val(dataset.detail);
        $form.find('#image').val(dataset.image);
    }
    function submitCreateEditPlace(e) {
        e.preventDefault()
        var $form = $('.place-form')
        const isCreate = $form.find('#id').val() ? false: true
        var data = {
            name: $form.find('#name').val(),
            price: $form.find('#price').val(),
            province_id: $form.find('#province_id').val(),
            detail: $form.find('#detail').val(),
            image: "",
            image_url: $form.find('#image').val()
        }
        if (isCreate) {
            create('place', data)
        } else {
            data['id'] = $form.find('#id').val()
            write('place', data)
        }
    }
    function handleDeletePlace(e) {
        e.preventDefault()
        const data = {
            id: e.target.dataset.id
        }
        unlink('place', data)
        
    }

    // ===Accommodations===
    function handleEditAccomodation(e) {
        e.preventDefault()
        
        var dataset = e.target.dataset;
        var $form = $('.accomodation-form')

        $form.find('#id').val(dataset.id);
        $form.find('#name').val(dataset.name);
        $form.find('#price').val(dataset.price);
        $form.find('#province_id').val(dataset.province_id);
        $form.find('#detail').val(dataset.detail);
        $form.find('#image').val(dataset.image);
    }
    function submitCreateEditAccomodation(e) {
        e.preventDefault()
        var $form = $('.accomodation-form')
        const isCreate = $form.find('#id').val() ? false: true
        var data = {
            name: $form.find('#name').val(),
            price: $form.find('#price').val(),
            province_id: $form.find('#province_id').val(),
            detail: $form.find('#detail').val(),
            image: "",
            image_url: $form.find('#image').val()
        }
        if (isCreate) {
            create('accomodation', data)
        } else {
            data['id'] = $form.find('#id').val()
            write('accomodation', data)
        }
    }
    function handleDeleteAccomodation(e) {
        e.preventDefault()
        const data = {
            id: e.target.dataset.id
        }
        unlink('accomodation', data)
        
    }

    // ===Transportation===
    function handleEditTransportation(e) {
        e.preventDefault()
        
        var dataset = e.target.dataset;
        var $form = $('.transportation-form')

        $form.find('#id').val(dataset.id);
        $form.find('#name').val(dataset.name);
        $form.find('#price').val(dataset.price);
        $form.find('#detail').val(dataset.detail);
        $form.find('#image').val(dataset.image);
    }
    function submitCreateEditTransportation(e) {
        e.preventDefault()
        var $form = $('.transportation-form')
        const isCreate = $form.find('#id').val() ? false: true
        var data = {
            name: $form.find('#name').val(),
            price: $form.find('#price').val(),
            detail: $form.find('#detail').val(),
            image: "",
            image_url: $form.find('#image').val()
        }
        if (isCreate) {
            create('transportation', data)
        } else {
            data['id'] = $form.find('#id').val()
            write('transportation', data)
        }
    }
    function handleDeleteTransportation(e) {
        e.preventDefault()
        const data = {
            id: e.target.dataset.id
        }
        unlink('transportation', data)
        
    }

    // Use useEffect to call the function when the component mounts
    useEffect(() => {
        getCategories();
        getLocations();
        getPlaces();
        getAccomodations();
        getTransportations();
    }, []); // Empty dependency array ensures it only runs once

    return (
        <>
            <Menu />
            <div className='body'>
                <div className="row">
                    <div className="col-1">
                        <div className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: '4.5rem' }}>
                            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                                <li className="nav-item nav-admin-top">
                                    <button
                                        className="nav-link active py-3 border-bottom"
                                        aria-current="page"
                                        id="pills-contact-tab"
                                        data-bs-toggle="pill"
                                        data-bs-original-title="Categories"
                                        data-bs-target="#category-config"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="true"
                                        title="Categories"
                                        >
                                            <i className="fa fa-picture-o admin-icon" />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="nav-link py-3 border-bottom"
                                        id="pills-contact-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#location-config"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="false"
                                        title="Locations"
                                        >
                                            <i className="fa fa-map admin-icon" />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="nav-link py-3 border-bottom"
                                        id="pills-contact-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#place-config"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="false"
                                        title="Places"
                                        >
                                            <i className="fa fa-map-marker admin-icon" />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="nav-link py-3 border-bottom"
                                        id="pills-contact-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#accomodation-config"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="false"
                                        title="Accomodations"
                                        >
                                            <i className="fa fa-bed admin-icon" />
                                    </button>
                                </li>
                                <li className='nav-admin-bottom'>
                                    <button
                                        className="nav-link py-3 border-bottom"
                                        id="pills-contact-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#transportation-config"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="false"
                                        title="Transportations"
                                    >
                                    <i className="fa fa-car admin-icon" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-11 tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="category-config" role="tabpanel">
                            <div className='text-center'>
                                <h4>
                                    Categories
                                </h4>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-10'>

                                    </div>
                                    <div className='col-2 text-center'>
                                        <button className="btn btn-primary" onClick={handleEditCategory}  
                                                data-bs-toggle="modal" 
                                                data-bs-target="#categoryModal" 
                                                data-bs-whatever="@getbootstrap">
                                            <i className='fa fa-plus mr-1' />
                                            <span> New</span>
                                        </button>
                                    </div>
                                    
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Detail</th>
                                            <th scope="col">Image</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr>
                                                <th scope="row">{category.id}</th>
                                                <td>{category.name}</td>
                                                <td style={{fontSize: '12px'}}>{category.detail}</td>
                                                <td style={{fontSize: '12px'}}>{category.image_url || category.image}</td>
                                                <td>
                                                    <button className="inline-button" onClick={handleEditCategory}  
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#categoryModal" 
                                                            data-bs-whatever="@getbootstrap"
                                                            data-id={category.id} data-name={category.name} data-detail={category.detail} data-image={category.image_url || category.image}>
                                                        <i className="fa fa-wrench" data-id={category.id} data-name={category.name} data-detail={category.detail} data-image={category.image_url || category.image}/>
                                                    </button>
                                                    <button className="inline-button" data-id={category.id} onClick={handleDeleteCategory}><i className="fa fa-trash" data-id={category.id}/></button>
                                                </td>
                                            </tr>
                                        ))}  
                                    </tbody>
                                </table>

                                <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Category</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className='category-form' onSubmit={submitCreateEditCategory}>
                                                    <div className="mb-3 d-none">
                                                        <input type="text" className="form-control" id="id" placeholder="ID"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="name" placeholder="Category" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="detail" placeholder="Detail" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="image" placeholder="Image" required/>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="location-config" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className='text-center'>
                                <h4>
                                    Locations
                                </h4>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-10'>

                                    </div>
                                    <div className='col-2 text-center'>
                                        <button className="btn btn-primary" onClick={handleEditlocation}  
                                                data-bs-toggle="modal" 
                                                data-bs-target="#locationModal" 
                                                data-bs-whatever="@getbootstrap">
                                            <i className='fa fa-plus mr-1' />
                                            <span> New</span>
                                        </button>
                                    </div>
                                    
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Province</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locations.map((category) => (
                                            <tr>
                                                <th scope="row">{category.id}</th>
                                                <td>{category.name}</td>
                                                <td>
                                                    <button className="inline-button" onClick={handleEditlocation}  
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#locationModal" 
                                                            data-bs-whatever="@getbootstrap"
                                                            data-id={category.id} data-name={category.name}>
                                                        <i className="fa fa-wrench" data-id={category.id} data-name={category.name}/>
                                                    </button>
                                                    <button className="inline-button" data-id={category.id} onClick={handleDeleteLocation}><i className="fa fa-trash" data-id={category.id}/></button>
                                                </td>
                                            </tr>
                                        ))}  
                                    </tbody>
                                </table>
                                <div className="modal fade" id="locationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Location</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className='location-form' onSubmit={submitCreateEditlocation}>
                                                    <div className="mb-3 d-none">
                                                        <input type="text" className="form-control" id="id" placeholder="ID"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="name" placeholder="Location" required/>
                                                    </div>
                                                    
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="place-config" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className='text-center'>
                                <h4>
                                    Places
                                </h4>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-10'>

                                    </div>
                                    <div className='col-2 text-center'>
                                        <button className="btn btn-primary" onClick={handleEditPlace}  
                                                data-bs-toggle="modal" 
                                                data-bs-target="#placeModal" 
                                                data-bs-whatever="@getbootstrap">
                                            <i className='fa fa-plus mr-1' />
                                            <span> New</span>
                                        </button>
                                    </div>  
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Place</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Province ID</th>
                                            <th scope="col">Detail</th>
                                            <th scope="col">Image</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {places.map((place) => (
                                            <tr>
                                                <th scope="row">{place.id}</th>
                                                <td>{place.name}</td>
                                                <td>${place.price}</td>
                                                <td width="12%">{place.province_id}</td>
                                                <td style={{fontSize: '12px'}}>{place.detail}</td>
                                                <td style={{fontSize: '12px'}}>{place.image_url || place.image }</td>
                                                <td>
                                                    <button className="inline-button" onClick={handleEditPlace}  
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#placeModal" 
                                                            data-bs-whatever="@getbootstrap"
                                                            data-id={place.id} data-name={place.name} data-price={place.price} data-province_id={place.province_id} data-detail={place.detail} data-image={place.image_url || place.image}>
                                                        <i className="fa fa-wrench" data-id={place.id} data-name={place.name} data-price={place.price} data-province_id={place.province_id} data-detail={place.detail} data-image={place.image_url || place.image}/>
                                                    </button>
                                                    <button className="inline-button" data-id={place.id} onClick={handleDeletePlace}><i className="fa fa-trash" data-id={place.id}/></button>
                                                </td>
                                            </tr>
                                        ))}  
                                    </tbody>
                                </table>
                                <div className="modal fade" id="placeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Place</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className='place-form' onSubmit={submitCreateEditPlace}>
                                                    <div className="mb-3 d-none">
                                                        <input type="text" className="form-control" id="id" placeholder="ID"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="name" placeholder="Place" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control" id="price" placeholder="Price" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control" id="province_id" placeholder="Province ID" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="detail" placeholder="Detail" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="image" placeholder="Image" required/>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="accomodation-config" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className='text-center'>
                                <h4>
                                    Accomodations
                                </h4>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-10'>

                                    </div>
                                    <div className='col-2 text-center'>
                                        <button className="btn btn-primary" onClick={handleEditAccomodation}  
                                                data-bs-toggle="modal" 
                                                data-bs-target="#accomodationModal" 
                                                data-bs-whatever="@getbootstrap">
                                            <i className='fa fa-plus mr-1' />
                                            <span> New</span>
                                        </button>
                                    </div>  
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Accommodation</th>
                                            <th scope="col">Price</th>
                                            <th width="12%" scope="col">Province ID</th>
                                            <th scope="col">Detail</th>
                                            <th scope="col">Image</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accomodations.map((accomodation) => (
                                            <tr>
                                                <th scope="row">{accomodation.id}</th>
                                                <td>{accomodation.name}</td>
                                                <td>${accomodation.price}</td>
                                                <td width="12%">{accomodation.province_id}</td>
                                                <td style={{fontSize: '12px'}}>{accomodation.detail}</td>
                                                <td style={{fontSize: '12px'}}>{accomodation.image_url || accomodation.image }</td>
                                                <td>
                                                    <button className="inline-button" onClick={handleEditAccomodation}  
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#accomodationModal" 
                                                            data-bs-whatever="@getbootstrap"
                                                            data-id={accomodation.id} data-name={accomodation.name} data-price={accomodation.price} data-province_id={accomodation.province_id} data-detail={accomodation.detail} data-image={accomodation.image_url || accomodation.image}>
                                                        <i className="fa fa-wrench" data-id={accomodation.id} data-name={accomodation.name} data-price={accomodation.price} data-province_id={accomodation.province_id} data-detail={accomodation.detail} data-image={accomodation.image_url || accomodation.image}/>
                                                    </button>                                                    
                                                    <button className="inline-button" data-id={accomodation.id} onClick={handleDeleteAccomodation}><i className="fa fa-trash" data-id={accomodation.id}/></button>
                                                </td>
                                            </tr>
                                        ))}  
                                    </tbody>
                                </table>
                                <div className="modal fade" id="accomodationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Accomodation</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className='accomodation-form' onSubmit={submitCreateEditAccomodation}>
                                                    <div className="mb-3 d-none">
                                                        <input type="text" className="form-control" id="id" placeholder="ID"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="name" placeholder="Accomodation" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control" id="price" placeholder="Price" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control" id="province_id" placeholder="Province ID" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="detail" placeholder="Detail" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="image" placeholder="Image" required/>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="transportation-config" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className='text-center'>
                                <h4>
                                    Transportations
                                </h4>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-10'>

                                    </div>
                                    <div className='col-2 text-center'>
                                        <button className="btn btn-primary" onClick={handleEditTransportation}  
                                                data-bs-toggle="modal" 
                                                data-bs-target="#transportationModal" 
                                                data-bs-whatever="@getbootstrap">
                                            <i className='fa fa-plus mr-1' />
                                            <span> New</span>
                                        </button>
                                    </div>  
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Transportations</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Detail</th>
                                            <th scope="col">Image</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transportations.map((transportation) => (
                                            <tr>
                                                <th scope="row">{transportation.id}</th>
                                                <td>{transportation.name}</td>
                                                <td>${transportation.price}</td>
                                                <td style={{fontSize: '12px'}}>{transportation.detail}</td>
                                                <td style={{fontSize: '12px'}}>{transportation.image_url || transportation.image }</td>
                                                <td>
                                                    <button className="inline-button" onClick={handleEditTransportation}  
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#transportationModal" 
                                                            data-bs-whatever="@getbootstrap"
                                                            data-id={transportation.id} data-name={transportation.name} data-price={transportation.price} data-detail={transportation.detail} data-image={transportation.image_url || transportation.image}>
                                                        <i className="fa fa-wrench" data-id={transportation.id} data-name={transportation.name} data-price={transportation.price} data-detail={transportation.detail} data-image={transportation.image_url || transportation.image}/>
                                                    </button>   
                                                    <button className="inline-button" data-id={transportation.id} onClick={handleDeleteTransportation}><i className="fa fa-trash" data-id={transportation.id}/></button>
                                                </td>
                                            </tr>
                                        ))}  
                                    </tbody>
                                </table>
                                <div className="modal fade" id="transportationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Transportation</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className='transportation-form' onSubmit={submitCreateEditTransportation}>
                                                    <div className="mb-3 d-none">
                                                        <input type="text" className="form-control" id="id" placeholder="ID"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="name" placeholder="Transportation" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control" id="price" placeholder="Price" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="detail" placeholder="Detail" required/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" id="image" placeholder="Image" required/>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  };
  
  export default Admin;
