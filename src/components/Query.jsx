import React from 'react'
import Button from '@mui/material/Button';
import {ToastContainer,toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Query() {
  
const Alert = ()=> toast("Feed Sent");
 
  return (
<div className="col-md-8">
  FeedBack<br/><br/>
  Name
    <form>
   
    <div className="form-outline mb-4">
      <input type="text" id="form4Example1" className="form-control" />
      <label className="form-label" for="form4Example1" ></label>
    </div>
  
  
    Message
    <div className="form-outline mb-4">
      <textarea className="form-control" id="form4Example3" rows="4"></textarea>
      <label className="form-label" for="form4Example3"></label>
    </div>
  

    <div className="form-check d-flex justify-content-center mb-4">
      <input className="form-check-input me-2" type="checkbox" value="" id="form4Example4"  />
      <label className="form-check-label" for="form4Example4">
        Send me a copy of this message
      </label>
    </div>
    

    <div>
    <Button variant="outlined" onClick={Alert}>Send</Button>
    <ToastContainer/>
        
      </div>
  </form>
  
  </div>
  )
}