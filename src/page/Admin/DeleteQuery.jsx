import { useState,useEffect } from "react";
import swal from 'sweetalert';
import AdminService from "../../services/AdminService";
import DeveloperService from "../../services/DeveloperService";
import AdminNav from "../../components/AdminNav";
import Box from '@mui/material/Box';

export default function DeleteQuery() {
    const [feed,setFeeds]=useState([]);

    useEffect(() => {
        init();
      }, []);

    const init =() => {
      DeveloperService.getAllFeeds()
     .then(response=>{
     console.log("printing the feed data",response.data);
     setFeeds(response.data);
    })
    .catch(error=>{
      console.log("something went wrong".error);
  
     })
    }
  
  
    const handleDelete = (feedId) => {
      console.log('Printing feed id', feedId);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your Feed",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          AdminService.deleteFeed(feedId)
          .then(response => {
            console.log('feed deleted successfully', response.data);
            init();
          })
          swal("Poof! Your feed has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your feed is safe!");
        }
      });
      }
  
    return ( 
      <div>
      <AdminNav/>
      <br/> <br/> <br/>

      <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
      <div className="col-md-8">
        <h3>List of feeds</h3>
        <hr/>
        <div>
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
             <tr>
              <th>Feed Id</th>
              <th>Query</th>
              <th>Topic</th>
              <th>Action</th>
             </tr>
            </thead>
            <tbody>
            {
            feed.map(feed => (
              <tr key={feed.feedId}>
              <td>{feed.feedId}</td>
              <td>{feed.query}</td>
              <td>{feed.topic}</td>
              <td>
                <button className="btn btn-danger ml-2" onClick={() => {handleDelete(feed.feedId);}}>Delete</button>
              </td>
              </tr>
            ))
  }
  </tbody>
          </table>
        </div>
      </div> 
      </Box>
      </div> 
     );
  }