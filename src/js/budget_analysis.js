import React from 'react';
import Menu from '../component/menu';
import BudgetAnalyzer from '../component/budget_anlyzer';
import Category from '../component/category';
import Show_Place_Province from '../component/Show_Place_Province';
import Footer_menu from '../component/footer_menu';


const BudgetAnalysis = () => {
  return (
      <div>
          <Menu />
          <body>
            <BudgetAnalyzer/>
            <Category />
            <Show_Place_Province />
            <Footer_menu />
          </body>
      </div>
  );
};

export default BudgetAnalysis;