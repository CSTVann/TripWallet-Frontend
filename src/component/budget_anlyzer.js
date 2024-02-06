import React, { useState, useEffect, useContext, createContext } from 'react';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

import $ from 'jquery'

// import { useAnalyzerFilter } from './analyzer_filter';
import '../css/budget_analyzer.css';

var CONFIG = require('../conf.json')

const BudgetAnalyzer = () => {
    const navigate = useNavigate()

    const [selectCategories, setSelectCategories] = useState([]);
    const [selectLocations, setSelectLocations] = useState([]);

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [minBudget, setMinBudget] = useState(0.00);
    const [maxBudget, setMaxBudget] = useState(0.00);
    

    function getLocations() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/province/selection`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setSelectLocations(response.provinces);
                // if (response) console.log(response.provinces)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }
    function getCategories() {
        $.ajax({
            url: `${CONFIG.ip}:${CONFIG.port}/category/selection`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Update state with fetched data
                setSelectCategories(response.categories);
                // if (response) console.log(response.categories)
            },
            error: function (error) {
                console.error('Error:', error);
            },
        });
    }

    const onChangeSelectCategory = (e) => {
        setCategories([e.value, e.label]);
    };
    const onChangeSelectLocation = (e) => {
        setLocations([e.value, e.label]);
    };
    const onChangeMinBudget = (e) => {
        setMinBudget(parseFloat(e.target.value))
    };
    const onChangeMaxBudget = (e) => {
        setMaxBudget(parseFloat(e.target.value))
    };

    const handleAnalysis = (e) => {
        e.preventDefault();
        localStorage.setItem('filter', JSON.stringify({
            "categories": categories,
            "locations": locations,
            "minBudget": minBudget,
            "maxBudget": maxBudget
        }));
        window.location.reload();

    }
    const handleReset = (e) => {
        e.preventDefault();
        localStorage.setItem('filter', JSON.stringify({
            "categories": [],
            "locations": [],
            "minBudget": 0.00,
            "maxBudget": 0.00
        }));
        window.location.reload();

    }
    
    // Use useEffect to call the function when the component mounts
    useEffect(() => {
        getCategories();
        getLocations();
    }, []);

    return (
        <section>
            <div className="budget-analysis-container">
                <div>
                    <h4 className="main-caption"><b>Budget Analysis</b></h4>
                </div>
                <form className="nest-form" onSubmit={handleAnalysis}>
                    <div className="row form-category">

                        {/* <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Category</label>
                            <Select options={selectCategories} onChange={onChangeSelectCategory} placeholder="Breaches, Mountains..." required />
                        </div> */}
                        <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">Location</label>
                            <Select options={selectLocations} onChange={onChangeSelectLocation} placeholder="Phnom Penh, Kompot..." required/>
                        </div>
                        
                    </div>
                    <div className="row form-budget">

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Min-Budget ($)</label>
                            <div className="input-container">
                                <input className="input-input" min="0" type="number" value={minBudget} onChange={onChangeMinBudget} placeholder="Mininum Budget..."/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Max-Budget ($)</label>
                            <div className="input-container">
                                <input className="input-input" min="0" type="number" value={maxBudget} onChange={onChangeMaxBudget} placeholder="Maxinum Budget..." required />
                            </div>
                        </div>
                        
                    </div>
                    
                    <span className='span-analysis-button'>
                        <button type="submit" className="btn btn-primary analysis-button">
                            Analysis
                        </button>
                    </span>
                    <span className='span-analysis-button'>
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>
                            Reset
                        </button>
                    </span>
                </form>

            </div>
        </section>
    );
};

export default BudgetAnalyzer;
