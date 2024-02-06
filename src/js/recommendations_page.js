import { React, useEffect } from "react";
import Menu  from "../component/menu";
import BudgetAnalyzer from '../component/budget_anlyzer';
import Category from '../component/category';
import Show_Place_Province from '../component/Show_Place_Province';
import BudgetAnalysis from "./budget_analysis";
import City_Recommend  from "../component/city_recommend";
import Footer_menu from "../component/footer_menu";


const Recommendation = () => {
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
    <>
      <Menu />      
      <body>
        <City_Recommend />
      </body>
      <Footer_menu />
    </>
  );
};

export default Recommendation;