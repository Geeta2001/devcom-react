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

const Addquery = () => {
  const[devId, setDevId] = useState('');
  const[query, setQuery] = useState('');
  const[topic, setTopic] = useState('');
  const navigate = useNavigate();
  const {feedid} = useParams();

  const saveFeed = (e) => {
      e.preventDefault();
      
      const feed = {feedid,devId,query,topic};
  
          //create
      
          DeveloperService.create(feed)
          .then(response => {
              console.log("feed added successfully", response.data);
              navigate("/dashboard");
          })
          .catch(error => {
              console.log('something went wrong', error);
          })
          
  }

  useEffect(() => {
      if (feedid) {
          DeveloperService.get(feedid)
              .then(feed=> {
                  setDevId(feed.data.devId)
                  setQuery(feed.data.query);
                  setTopic(feed.data.topic);
              })
              .catch(error => {
                  console.log('Error adding query', error);
              })
      }
  }, [])
    return (
    <div>
<DevNav/>
        <br/><br/><br/><br/>
<Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
<div className="col-4">
<h3>Add Query</h3>
<br/>
<div className="form-outline mb-4" id="devId" value={devId} onChange= {(e) => setDevId(e.target.value)}
                    placeholder="Enter developer id">
  Developer Id 
  <input type="text" id="form7Example1" className="form-control" />
  <label className="form-label" for="form7Example1"></label>
</div>

<div className="form-outline mb-4" id="topic" value={topic} onChange= {(e) => setTopic(e.target.value)}
                    placeholder="Enter topic">
  Topic 
  <input type="text" id="form7Example1" className="form-control" />
  <label className="form-label" for="form7Example1"></label>
</div>
Query
<div className="form-outline mb-4" value={query} onChange= {(e) => setQuery(e.target.value)}
                    placeholder="Enter query">
  <input type="email" id="query" className="form-control" />
  <label className="form-label" for="form7Example2"></label>
  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={(e) => saveFeed(e)}>
              Post
            </Button>
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