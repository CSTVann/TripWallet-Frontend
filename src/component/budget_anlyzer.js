import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import $ from 'jquery';

import '../css/budget_analyzer.css';

// Import your static categories data
import categoriesData from './categoriesData';

var CONFIG = require('../conf.json');

const BudgetAnalyzer = () => {
  const navigate = useNavigate();

  // React Select expects options as { value, label }
  const categoryOptions = categoriesData.map(cat => ({
    value: cat.id,
    label: cat.name,
  }));

  // Selected category and location states (single selection assumed)
  const [selectCategories, setSelectCategories] = useState(null);
  const [selectLocations, setSelectLocations] = useState(null);

  // Budgets state
  const [minBudget, setMinBudget] = useState(0.0);
  const [maxBudget, setMaxBudget] = useState(0.0);

  // Fetch locations from API
  function getLocations() {
    $.ajax({
      url: `${CONFIG.ip}:${CONFIG.port}/province/selection`,
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        setSelectLocations(null); // Clear selection when locations reload
        setLocationsOptions(response.provinces); // See below: this state holds location options
      },
      error: function (error) {
        console.error('Error fetching locations:', error);
      },
    });
  }

  // Location options state for react-select
  const [locationsOptions, setLocationsOptions] = useState([]);

  // Handle category change
  const onChangeSelectCategory = (selectedOption) => {
    setSelectCategories(selectedOption);
  };

  // Handle location change
  const onChangeSelectLocation = (selectedOption) => {
    setSelectLocations(selectedOption);
  };

  // Budget input change handlers
  const onChangeMinBudget = (e) => setMinBudget(parseFloat(e.target.value) || 0);
  const onChangeMaxBudget = (e) => setMaxBudget(parseFloat(e.target.value) || 0);

  // Handle form submission
  const handleAnalysis = (e) => {
    e.preventDefault();

    // Prepare filter data to save
    const filterData = {
      categories: selectCategories ? [selectCategories.value, selectCategories.label] : [],
      locations: selectLocations ? [selectLocations.value, selectLocations.label] : [],
      minBudget,
      maxBudget,
    };

    localStorage.setItem('filter', JSON.stringify(filterData));
    window.location.reload();
  };

  // Handle reset form
  const handleReset = (e) => {
    e.preventDefault();
    setSelectCategories(null);
    setSelectLocations(null);
    setMinBudget(0.0);
    setMaxBudget(0.0);

    localStorage.setItem(
      'filter',
      JSON.stringify({
        categories: [],
        locations: [],
        minBudget: 0.0,
        maxBudget: 0.0,
      })
    );
    window.location.reload();
  };

  // Load locations from API on mount
  useEffect(() => {
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
            <div className="form-group col-md-12">
              <label htmlFor="inputCategory">Location</label>
              <Select
                options={categoryOptions}
                onChange={onChangeSelectCategory}
                value={selectCategories}
                placeholder="Phnom Penh, Siemreap..."
                isClearable
                required
              />
            </div>
          </div>
          <div className="row form-budget">
            <div className="form-group col-md-6">
              <label htmlFor="inputMinBudget">Min-Budget ($)</label>
              <div className="input-container">
                <input
                  className="input-input"
                  min="0"
                  type="number"
                  value={minBudget}
                  onChange={onChangeMinBudget}
                  placeholder="Minimum Budget..."
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputMaxBudget">Max-Budget ($)</label>
              <div className="input-container">
                <input
                  className="input-input"
                  min="0"
                  type="number"
                  value={maxBudget}
                  onChange={onChangeMaxBudget}
                  placeholder="Maximum Budget..."
                  required
                />
              </div>
            </div>
          </div>
          <span className="span-analysis-button">
            <button type="submit" className="btn btn-primary analysis-button">
              Analysis
            </button>
          </span>
          <span className="span-analysis-button">
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




// import React, { useState, useEffect, useContext, createContext } from 'react';
// import Select from 'react-select'
// import { useNavigate } from 'react-router-dom';

// import $ from 'jquery'

// import '../css/budget_analyzer.css';

// var CONFIG = require('../conf.json')

// const BudgetAnalyzer = () => {
//     const navigate = useNavigate()

//     const [selectCategories, setSelectCategories] = useState([]);
//     const [selectLocations, setSelectLocations] = useState([]);

//     const [categories, setCategories] = useState([]);
//     const [locations, setLocations] = useState([]);
//     const [minBudget, setMinBudget] = useState(0.00);
//     const [maxBudget, setMaxBudget] = useState(0.00);
    

//     function getLocations() {
//         $.ajax({
//             url: `${CONFIG.ip}:${CONFIG.port}/province/selection`,
//             type: 'GET',
//             dataType: 'json',
//             success: function (response) {
//                 setSelectLocations(response.provinces);
//             },
//             error: function (error) {
//                 console.error('Error:', error);
//             },
//         });
//     }
//     function getCategories() {
//         $.ajax({
//             url: `${CONFIG.ip}:${CONFIG.port}/category/selection`,
//             type: 'GET',
//             dataType: 'json',
//             success: function (response) {
//                 setSelectCategories(response.categories);
//             },
//             error: function (error) {
//                 console.error('Error:', error);
//             },
//         });
//     }

//     const onChangeSelectCategory = (e) => {
//         setCategories([e.value, e.label]);
//     };
//     const onChangeSelectLocation = (e) => {
//         setLocations([e.value, e.label]);
//     };
//     const onChangeMinBudget = (e) => {
//         setMinBudget(parseFloat(e.target.value))
//     };
//     const onChangeMaxBudget = (e) => {
//         setMaxBudget(parseFloat(e.target.value))
//     };

//     const handleAnalysis = (e) => {
//         e.preventDefault();
//         localStorage.setItem('filter', JSON.stringify({
//             "categories": categories,
//             "locations": locations,
//             "minBudget": minBudget,
//             "maxBudget": maxBudget
//         }));
//         window.location.reload();

//     }
//     const handleReset = (e) => {
//         e.preventDefault();
//         localStorage.setItem('filter', JSON.stringify({
//             "categories": [],
//             "locations": [],
//             "minBudget": 0.00,
//             "maxBudget": 0.00
//         }));
//         window.location.reload();

//     }
    
//     useEffect(() => {
//         getCategories();
//         getLocations();
//     }, []);

//     return (
//         <section>
//             <div className="budget-analysis-container">
//                 <div>
//                     <h4 className="main-caption"><b>Budget Analysis</b></h4>
//                 </div>
//                 <form className="nest-form" onSubmit={handleAnalysis}>
//                     <div className="row form-category">

                       
//                         <div className="form-group col-md-12">
//                             <label htmlFor="inputPassword4">Location</label>
//                             <Select options={selectLocations} onChange={onChangeSelectLocation} placeholder="Phnom Penh, Kompot..." required/>
//                         </div>
                        
//                     </div>
//                     <div className="row form-budget">

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputEmail4">Min-Budget ($)</label>
//                             <div className="input-container">
//                                 <input className="input-input" min="0" type="number" value={minBudget} onChange={onChangeMinBudget} placeholder="Mininum Budget..."/>
//                             </div>
//                         </div>
//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputEmail4">Max-Budget ($)</label>
//                             <div className="input-container">
//                                 <input className="input-input" min="0" type="number" value={maxBudget} onChange={onChangeMaxBudget} placeholder="Maxinum Budget..." required />
//                             </div>
//                         </div>
                        
//                     </div>
                    
//                     <span className='span-analysis-button'>
//                         <button type="submit" className="btn btn-primary analysis-button">
//                             Analysis
//                         </button>
//                     </span>
//                     <span className='span-analysis-button'>
//                         <button type="button" className="btn btn-secondary" onClick={handleReset}>
//                             Reset
//                         </button>
//                     </span>
//                 </form>

//             </div>
//         </section>
//     );
// };

// export default BudgetAnalyzer;
