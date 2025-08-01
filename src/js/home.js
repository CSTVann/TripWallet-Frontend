import { React, useEffect } from 'react';
import Menu from '../component/menu';
import BudgetAnalyzer from '../component/budget_anlyzer';
import Banner from '../component/banner';
import Category from '../component/category';
import Show_Place_Province from '../component/Show_Place_Province';
import Footer_menu from '../component/footer_menu';

const Home = () => {

  useEffect(() => {
      // Reset Filter in local Storage
      localStorage.setItem('filter', JSON.stringify({
          "categories": [],
          "locations": [],
          "minBudget": 0.00,
          "maxBudget": 0.00
      }));
  }, []);
  return (
      <div className="root-home">
        <Menu />
        <body>
          <div width="100%">
            <Banner />
          </div>
          {/* <BudgetAnalyzer/> */}
          <Category />
          {/* <Show_Place_Province /> */}
          <Footer_menu />
        </body>
      </div>
  );
};

export default Home;