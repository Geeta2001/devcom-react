import DeveloperService from "../../services/DeveloperService";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import DevNav from '../../components/DevNav';
import Box from '@mui/material/Box';

export default function AddResponse() {
    
    const[devId,setDevId] = useState('');
    const[feedId,setFeedId] = useState('');
    const[answer,setAnswer] = useState('');
    const[errors, setErrors] = useState('');
    const navigate= useNavigate();

    useEffect(() => {
        const did = localStorage.getItem('devId');
        setDevId(did);
        console.log(did);
        console.log(devId);
        const fid = localStorage.getItem('feedId');
        setFeedId(fid);
        console.log(fid);
    })
    const saveResponse= (e) => {
        e.preventDefault();
    
     const responses = {answer,devId, feedId};
     const errors = validate({...responses});
     if(Object.keys(errors).length === 0){  
     DeveloperService.addResponse(responses)
     .then(response => {
     console.log('Response added successfully',response.data);
     Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Response added Successful.`,
        showConfirmButton: false,
        timer: 3000
    });
     navigate("/dashboard");
     
     } )
    .catch(error => {
        console.log('something went wrong',error);
        Swal.fire({
            icon: 'error',
            title: 'OOPS!',
            text: ` Error occured`,
            showConfirmButton: false,
            timer: 3000
        });
     })
    }
    else{
        setErrors(errors);
      }
     }  

    return ( 
    <>
    <DevNav/>
    <br></br><br></br>
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="container">
            <h2>Add response</h2>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control col-4" disabled id="devId"
                    value={devId} onChange= {(e) => setDevId(e.target.value)} placeholder="Enter devkey"/>
                    </div>
                    <br/>
                    <div className="form-group">
                    <input type="text" className="form-control col-4" id="feedId" value={feedId} 
                    onChange= {(e) => setFeedId(e.target.value)} placeholder="Enter feedkey"/>
                    </div> 
                    <br/>
                    
                    <div className="form-group">
                    <input
                    type="text"
                    className="form-control col-4"
                    id="answer"
                    value={answer}
                    onChange= {(e) => setAnswer(e.target.value)}
                    placeholder="Enter Answer"
                    />
                    {errors.answer && <p style={{color:'red'}}>{errors.answer}</p>}
                    </div>
                    <br/>
                    
                <div>
                    <button className="btn btn-primary" onClick={(e)=>saveResponse(e)}>save</button>
                </div>
            </form>
        </div>
        </Box>
        </>
     );
}

function validate({answer}) {
    let errors = {};
    if(!answer)  {
      errors.answer = 'Answer is required';
    } 
    return errors;
  }