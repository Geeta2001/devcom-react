import './App.css';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import {Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/User/Home';
import LoginPage from './page/User/LoginPage';
import RegisterPage from './page/User/RegisterPage';
import Dashboard from './page/Dev/Dashboard';
import AddDetails from './page/Dev/AddDetails';
import Addquery from './page/Dev/Addquery';
import AdminPage from './page/Admin/AdminPage';
import UpdateDetails from './page/Dev/UpdateDetails';
import AddResponse from './page/Dev/AddResponse';
import ViewResponse from './page/Dev/ViewResponse';
import ViewDeveloper from './page/Admin/ViewDeveloper';
import DeleteQuery from './page/Admin/DeleteQuery';
import DeleteResponse from './page/Admin/DeleteResponse';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/AddDetails' element={<AddDetails/>}/>
    <Route path='/updatedetails' element={<UpdateDetails/>}/>
    <Route path='/Addquery' element={<Addquery/>}/>
    <Route path='/AddResponse' element={<AddResponse/>}/>
    <Route path='/AdminPage' element={<AdminPage/>}/>
    <Route path='/ViewResponse' element={<ViewResponse/>}/>
    <Route path='/ViewDeveloper' element={<ViewDeveloper/>}/>
    <Route path='/DeleteQuery' element={<DeleteQuery/>}/>
    <Route path='/DeleteResponse' element={<DeleteResponse/>}/>

    </Routes>
    </BrowserRouter>

}

export default App;