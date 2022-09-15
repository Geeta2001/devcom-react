import React, { useEffect } from 'react'
import DevNav from '../../components/DevNav';
import { Button } from '@mui/material'
import {ToastContainer,toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams} from 'react-router-dom';
import DeveloperService from '../../services/DeveloperService';
import { useState } from 'react';
import Swal from 'sweetalert2';


export default function UpdateDetails() {
    const navigate = useNavigate()

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[skillLevel, setSkillLevel] = useState('');
    const[devId, setDevId] = useState('');
    const[userId, setUserId] = useState('');

    useEffect( () =>{
        const id = localStorage.getItem('userId');
        setUserId(id);
        console.log(userId);
        const devid = localStorage.getItem('devId');
        setDevId(devid);
        console.log(devId);
        
    },[] )
    const updateDetails = (e) => {

        e.preventDefault();

        const details = {name, email, skillLevel, userId, devId}
        console.log(JSON.stringify(details));
        DeveloperService.updateDetails(devId, details)
        .then(response =>{
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
        }) 
    }

  return (<>
  <div>
<DevNav/>
<br/><br/><br/><br/>
 
   < form >
            <div className="container">
                <h1>Update details</h1>
                <div className='patform'>
                <div className="row">
                    <label><b>Name</b></label>
                    <input type="text" name="name" required 
                        value={name}
                        onChange= {(e) => setName(e.target.value)}
                        />    
                </div><br></br>    
                <div className="row">
                    <label><b>Email</b></label>
                    <input type="email" name="email" required
                        value={email}
                        onChange= {(e) => setEmail(e.target.value)}
                        />
                </div><br></br>
                <div className="row">
                    <label><b>Skill Level</b></label>
                    <input type="text" name="skill level" required
                        value={skillLevel}
                        onChange= {(e) => setSkillLevel(e.target.value)}
                        />
                </div>
                <div className="row">
                    <label><b>User Id</b></label>
                    <input type="number" placeholder="Enter User Id" name="User Id"
                    disabled
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}/>
                </div>
                <div className="row">
                    <label><b>Developer Id</b></label>
                    <input type="number" placeholder="Enter Developer Id" name="Dev Id"
                        value={devId} 
                        onChange={(e) => setDevId(e.target.value)}/>
                </div>
            <br/>
               
                <Button  variant="contained"  onClick={updateDetails}>submit</Button><br></br>
           {/*     <Button onClick={useEffect}>Get Id</Button>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
                 newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover />
  */}  
                </div>
                </div>
                </form>
                </div>
                 </>
  )
}

