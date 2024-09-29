import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AerobicTrainings from './components/AerobicTrainings/AerobicTrainings';
import StrengthTrainings from './components/StrengthTrainings/StrengthTrainings';
import AerobicTrainingDetails from './components/AerobicTrainingDetails/AerobicTrainingDetails';
import StregthTrainingDetails from './components/StregthTrainingDetails/StregthTrainingDetails';
import CreateAerobicTrainings from './components/CreateAerobicTraining/CreateAerobicTraining';
import EditAerobicTraining from './components/EditAerobicTraining/EditAerobicTraining';
import Layout from './components/Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import CreateSet from './components/CreateSet/CreateSet';
import CreateStrengthTraining from './components/CreateStrengthTraining/CreateStrengthTraining';
import Unauthorized from './components/Unauthorized/Unauthorized';
import VerifyUser  from './components/VerifyUser/VerifyUser';


function App() {

  const useLayout = (child) => {
    
    return (
      <Layout children={child}/>
    )
  }

  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={useLayout(<Login/>)} /> 
        <Route path="/login" element={useLayout(<Login/>)} /> 
        <Route path="/register" element={useLayout(<Register />)} /> 
        <Route path="/aerobic" element={useLayout(<AerobicTrainings/>)} /> 
        <Route path="/aerobic-create-new" element={useLayout(<CreateAerobicTrainings/>)} /> 
        <Route path="/aerobic-edit-training/:id" element={useLayout(<EditAerobicTraining/>)} /> 
        <Route path="/aerobic/:id" element={useLayout(<AerobicTrainingDetails/>)} /> 
        <Route path="/strength" element={useLayout(<StrengthTrainings />)} /> 
        <Route path="/strength/:id" element={useLayout(<StregthTrainingDetails />)} /> 
        <Route path="/create-new-strength-training" element={useLayout(<CreateStrengthTraining />)} /> 
        <Route path="/set-create-new/:id" element={useLayout(<CreateSet />)} /> 
        <Route path="/verify" element={useLayout(<VerifyUser />)} /> 
        <Route path="/unauthorized" element={useLayout(<Unauthorized/>)} /> 
        <Route path="*" element={useLayout(<ErrorPage/>)} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;
