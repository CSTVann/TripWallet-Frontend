import React, { useState, useEffect } from 'react';
import '../css/category.css';
import landscape1 from '../img/landscape1.png';

// Import the static categories data from a separate file
import categoriesData from './categoriesData';

const Category = () => {
  // Initialize categories state as empty array
  const [categories, setCategories] = useState([]);

  // useEffect runs once on component mount
  useEffect(() => {
    // Set categories state to the imported static data
    setCategories(categoriesData);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <article>
      <div className="nest-beach-boxshow">
        <div>
          <h4 className="main-caption caption-category">Category</h4>
        </div>
        <div className="show-category">
          {/* Loop through categories and render cards */}
          {categories.map((category) => (
            <div
              className="card cardc"
              style={{ width: '18rem' }}
              key={category.id} // Unique key required for React lists
            >
              {/* Show category image; fallback to default image */}
              <img
                src={category.image_url || category.image || landscape1}
                className="card-img-top"
                alt={category.name || 'Category image'}
              />
              <div className="card-body">
                {/* Display category name */}
                <h5 className="card-title">
                  <b>{category.name}</b>
                </h5>
                {/* Display category detail/description */}
                <p className="card-text">{category.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Category;



// import React, { useState, useEffect } from 'react';
// import '../css/category.css';
// import landscape1 from '../img/landscape1.png';

// import $ from 'jquery'

// var CONFIG = require('../conf.json')

// const Category = () => {

//     const [categories, setCategories] = useState([]);


//     function getCategories() {
//         $.ajax({
//             url: `${CONFIG.ip}:${CONFIG.port}/category`,
//             type: 'GET',
//             dataType: 'json',
//             success: function (response) {
//                 setCategories(response.categories);
//             },
//             error: function (error) {
//                 console.error('Error:', error);
//             },
//         });
//     }

//     useEffect(() => {
//         getCategories();
//     }, []); 



//     return (
//         <article>
//             <div className="nest-beach-boxshow">
//                 <div>
//                     <h4 className="main-caption caption-category">Category</h4>
//                 </div>
//                 <div className="show-category">
//                     {categories.map((category) => (
//                         <div className="card cardc" style={{ width: '18rem' }} key={category.id}>
//                             <img src={category.image_url || category.image || landscape1} className="card-img-top" alt="..." />
//                             <div className="card-body">
//                                 <h5 className="card-title"><b>{category.name}</b></h5>
//                                 <p className="card-text">{category.detail}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default Category;
