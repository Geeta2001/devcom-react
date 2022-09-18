import React from 'react'
import DevNav from '../../components/DevNav';
import { Button } from '@mui/material'
import {ToastContainer}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';
import DeveloperService from '../../services/DeveloperService';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';

export default function AddDetails() {
    const navigate = useNavigate()

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[skillLevel, setSkillLevel] = useState('');
    const[userId, setUserId] = useState('');
    const[errors, setErrors] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);

        const uname = localStorage.getItem('userName');
        setEmail(uname);
    })
    
    const saveDetails = (e) => {
        e.preventDefault();

        const details = {name, email, skillLevel, userId};
        const errors = validate({...details});
        if(Object.keys(errors).length === 0){
        console.log(JSON.stringify(details));
        DeveloperService.addDetails(details)
        .then(response => {
            localStorage.setItem('Name', details.name);
            localStorage.setItem('Skill', details.skillLevel);
            localStorage.setItem('devId', response.data);
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
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Details already exist`,
                showConfirmButton: false,
                timer: 3000
            });
        })
    }
    else{
        setErrors(errors);
      }
    }
    
return (<>
    <div>
    <DevNav/>
    <br/><br/><br/><br/>
    <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <form>
            <div className="container">
                <h1>Add details</h1>
                <div className='patform'>
                <div className="row">
                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>    
                {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
                </div>
                <br></br>    
                <div className="row">
                    <label><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" 
                        value={email} disabled
                        onChange={(e) => setEmail(e.target.value)}/>
                </div><br></br>
                <div className="row">
                    <label><b>Skill Level</b></label>
                    <input type="text" placeholder="Enter Skill level" name="skill level" required
                        value={skillLevel} 
                        onChange={(e) => setSkillLevel(e.target.value)}/>
                {errors.skillLevel && <p style={{color:'red'}}>{errors.skillLevel}</p>}
                </div>
                <br/>

                <br/>
                    <Button  variant="contained" onClick={saveDetails} >submit</Button><br></br>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} 
                    newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover/> 
                </div>
                </div>
                </form>
                </Box>
                </div>
                 </>
  )
  
  function validate({name, skillLevel}) {
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    } 
    if (!skillLevel) {
      errors.skillLevel = 'Skill level is required';
    } 
    return errors;
  }
}

