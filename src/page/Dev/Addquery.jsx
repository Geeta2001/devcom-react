import React from 'react'
import DevNav from '../../components/DevNav'
import {useEffect,useState } from 'react';
import {Link,useNavigate, useParams} from 'react-router-dom';
import DeveloperService from '../../services/DeveloperService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Swal from 'sweetalert2';

const Addquery = () => {
  const[devId, setDevId] = useState('');
  const[query, setQuery] = useState('');
  const[topic, setTopic] = useState('');
  const[errors, setErrors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const devid = localStorage.getItem('devId');
    setDevId(devid);
  })

  const saveFeed = (e) => {
      e.preventDefault();
      
      const feed = {devId,query,topic};
      const errors = validate({...feed});
      console.log(JSON.stringify(feed));
      if(Object.keys(errors).length === 0){  
          DeveloperService.create(feed)
          .then(response => {
              console.log("feed added successfully", response.data);
              localStorage.setItem('feedId', response.data);
              console.log(localStorage.getItem('feedId'));
              Swal.fire({
                icon: 'success',
                title: 'Added',
                text: `Added query successfully`,
                showConfirmButton: false,
                timer: 3000
            });  
              navigate("/dashboard");
          })
          .catch(error => {
              console.log('something went wrong', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Query already exists`,
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
<div>
<DevNav/>
<br/><br/><br/><br/>
<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
<div className="col-4">
  <h3>Add Query</h3>
  <br/>
    <div className="form-outline mb-4" id="devId">
      Developer Id 
    <input type="text" id="form7Example1" className="form-control" placeholder="Enter developer id" 
      value={devId} onChange= {(e) => setDevId(e.target.value)}/>
    <label className="form-label" for="form7Example1"></label>
    </div>

    <div className="form-outline mb-4">
       Topic 
      <input type="text" className="form-control" id="topic" 
        value={topic} onChange= {(e) => setTopic(e.target.value)} placeholder="Enter topic" />
      <label className="form-label" for="form7Example1"> </label>
      {errors.topic && <p style={{color:'red'}}>{errors.topic}</p>}
  </div>
  Query
  <div className="form-outline mb-4" >
    <input type="email" id="query" className="form-control" value={query} 
    onChange= {(e) => setQuery(e.target.value)} placeholder="Enter query"/>
    <label className="form-label" for="form7Example2"></label>
    {errors.query && <p style={{color:'red'}}>{errors.query}</p>}

  <Button type="submit" fullWidth variant="contained" 
  sx={{ mt: 3, mb: 2 }} onClick={(e) => saveFeed(e)}>Post </Button>
</div>
</div>

</Box>
<BottomNavigation>
  <BottomNavigationAction label="Recent Querys" href='/dashboard' icon={<RestoreIcon />} />
  <BottomNavigationAction label="Refresh" href='/Addquery' icon={<CancelScheduleSendOutlinedIcon />} />
</BottomNavigation>
</div>
    
)
}
export default Addquery;

function validate({topic, query}) {
  let errors = {};
  if(!topic)  {
    errors.topic = 'Topic is required';
  } 
  if (!query) {
    errors.query = 'Please enter the query';
  } 
  return errors;
}
