import React from 'react'
import DevNav from '../../components/DevNav';
import { Button } from '@mui/material'
import {ToastContainer,toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';
import DeveloperService from '../../services/DeveloperService';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UpdateDetails from './UpdateDetails';

{/*const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);  */}


export default function AddDetails() {
    const navigate = useNavigate()

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[skillLevel, setSkillLevel] = useState('');
    const[userId, setUserId] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
    })
    
    const saveDetails = (e) => {
        e.preventDefault();

        const details = {name, email, skillLevel, userId};
        console.log(JSON.stringify(details));
        DeveloperService.addDetails(details)
        .then(response => {
            console.log("details added", response.data);
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `Details added Successful.`,
                showConfirmButton: false,
                timer: 3000
            });
            navigate('/dashboard');
        })
        .catch( error => {
            console.log("error", error);
        })
    }

    
return (<>
<div>
<DevNav/>
<br/><br/><br/><br/>

   < form >
            <div className="container">
                <h1>Add details</h1>
                <div className='patform'>
                <div className="row">
                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>    
                </div><br></br>    
                <div className="row">
                    <label><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                </div><br></br>
                <div className="row">
                    <label><b>Skill Level</b></label>
                    <input type="text" placeholder="Enter Skill level" name="skill level" required
                        value={skillLevel} 
                        onChange={(e) => setSkillLevel(e.target.value)}/>
                </div>
                <div className="row">
                    <label><b>User Id</b></label>
                    <input type="number" placeholder="Enter User Id" name="User Id"
                    disabled
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}/>
                </div>
                <br/>
               
                    <Button  variant="contained" onClick={saveDetails} >submit</Button><br></br>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} 
                    newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover/> 
                <br/> <br/>
                    <Button  variant="contained" href='/UpdateDetails'>Update details</Button><br></br>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} 
                    newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover/>  
                </div>
                </div>
                </form>
                </div>
                 </>
  )
}

