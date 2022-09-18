import React from 'react';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import AdminService from '../../services/AdminService';
import DeveloperService from '../../services/DeveloperService';
import AdminNav from '../../components/AdminNav';
import Box from '@mui/material/Box';

export default function DeleteResponse() {
  const [responses,setResponses] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    DeveloperService.getAllResponses()
    .then(response => {
    console.log('Printing Responses',response.data);
    setResponses(response.data);
    })
    .catch(error => {
    console.log('something went wrong',error);
    })
  }


  const handleDelete = (respId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Response!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        AdminService.deleteResponse(respId)
        .then(response =>{
          console.log('Response Deleted successfully',response.data);
          init();
        })
        swal("Poof! Your Response has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Response is safe!");
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
    <div className='col-md-8'>
    <h3>
      List Of Responses
    </h3>

    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        
          <tr>
            <th>Resp Id</th>
            <th>answer</th>
          <th>Delete</th>
          </tr>
      </thead>
      <tbody>
          {
            responses.map(response=> (
              <tr key={response.respId}>
                <td>{response.respId}</td>
                <td>{response.answer}</td>
                <td>
                  <button className="btn btn-danger ml-4" onClick={(e) =>{ handleDelete(response.respId)}}>Delete</button>
                </td>
              </tr>
            ))
          }
          
      </tbody>

    </table>

    </div>
    </Box>
    </div>
  );
}