import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState , React} from 'react';
import { LoginProvider } from '../js/LoginHandler';


import Menu from '../component/menu';
import BudgetAnalysis from './budget_analysis'
import Home from './home'
import Recommendation from './recommendations_page';
import Register_Form from './Loginpage';
import Registers_Form from './Registerpge';
import Admin from './admin';




const ParentComponent = () => {

  return (
      <LoginProvider>
          <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/recommendation" element={<Recommendation />}/>
                <Route path="/budget_analysis" element={<BudgetAnalysis />} />
                <Route path="/login" element={<Register_Form />} />
                <Route path="/register" element={<Registers_Form />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
      </LoginProvider>
  );
};

export default ParentComponent;