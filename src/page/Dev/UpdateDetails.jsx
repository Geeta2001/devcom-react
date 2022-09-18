import React, { useEffect } from 'react'
import DevNav from '../../components/DevNav';
import { Button } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';
import DeveloperService from '../../services/DeveloperService';
import { useState } from 'react';
import Swal from 'sweetalert2';


export default function UpdateDetails() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[skillLevel, setSkillLevel] = useState('');
    const[devId, setDevId] = useState('');
    const[userId, setUserId] = useState('');
    const[errors, setErrors] = useState('');

    const uname = localStorage.getItem('Name');
    const uskill = localStorage.getItem('Skill');

    useEffect( () =>{
        const id = localStorage.getItem('userId');
        setUserId(id);
        const devid = localStorage.getItem('devId');
        setDevId(devid);
        const uname = localStorage.getItem('userName');
        setEmail(uname);
        
    },[] )
    const updateDetails = (e) => {

        e.preventDefault();

        const details = {name, email, skillLevel, userId};
        const errors = validate({...details});
        if(Object.keys(errors).length === 0){
        console.log(JSON.stringify(details));
        DeveloperService.updateDetails(devId, details)
        .then(response =>{
            localStorage.setItem('Name', details.name);
            localStorage.setItem('Skill', details.skillLevel);
            console.log("Updated successfully",response.data);
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: `updated details successfully`,
                showConfirmButton: false,
                timer: 3000
            });        
        })
        .catch(error => {
           console.log('Error updating details',error);
           Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Details should not be same`,
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
 
   <form>
            <div className="container">
                <h1>Update details</h1>
                <div className='patform'>
                <div className="row">
                    <label><b>Name</b></label>
                    <input type="text" name="name" required 
                        value={name} placeholder={uname}
                        onChange= {(e) => setName(e.target.value)}
                        />
                    {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
                </div><br></br>    
                <div className="row">
                    <label><b>Email</b></label>
                    <input type="email" name="email" disabled
                        value={email} 
                        onChange= {(e) => setEmail(e.target.value)}
                        />
                </div><br></br>
                <div className="row">
                    <label><b>Skill Level</b></label>
                    <input type="text" name="skill level" required
                        value={skillLevel} placeholder={uskill}
                        onChange= {(e) => setSkillLevel(e.target.value)}
                        />
                    {errors.skillLevel && <p style={{color:'red'}}>{errors.skillLevel}</p>}
                </div>
                
            <br/>
                <Button  variant="contained"  onClick={updateDetails}>submit</Button><br></br>
            </div>
            </div>
        </form>
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

