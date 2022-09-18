import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import DeveloperService from '../../services/DeveloperService';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import DevNav from '../../components/DevNav';

export default function ViewResponses() {
    const [resps, setResps ] = useState([]);
    const [answer, setAnswer] = useState('');
    const [devId, setDevId] = useState('');
    const [feedId, setFeedId] = useState('');
    const [respId, setRespId] = useState('');

    useEffect(() => {
        const did = localStorage.getItem('devId');
        setDevId(did);
    })

    useEffect( () => {
        DeveloperService.getAllResponses()
        .then(response => {
          console.log('displaying responses', response.data);
          setResps(response.data);
    
        })
        .catch(error => {
            console.log('Response not found', error);
        })
    },[])

    const Edit = (e) => {
        e.preventDefault();

        const data = {devId, feedId, answer}
        DeveloperService.editResponse(respId, data)
        .then(response => {
            console.log("Updated successfully",response.data)
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: `updated response successfully`,
                showConfirmButton: false,
                timer: 3000
            });   
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: `Error`,
                showConfirmButton: false,
                timer: 3000
            }); 
            console.log('Error updating details',error);
        })
    }

    return (
    <div>
        <DevNav/>
        <br/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
        <MDBCard>
            <h2>Responses</h2>
        <MDBCardBody>
            {
                resps.map(response => (
                    <>
                    <MDBCardTitle key={response.respId}>
                    {response.respId}. {response.answer}
                    
                    </MDBCardTitle>
                    </>
                ))
            }

            <br/>
            Write Updated Response<br/>
            <input type="text" className="form-control col-4" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
            <br/>

            Response Id<br/>
            <input type="text"className="form-control col-4" value={respId} onChange={(e) => setRespId(e.target.value)}/>
            <br/>

            Developer Id<br/>
            <input type="text"className="form-control col-4" value={devId} onChange={(e) => setDevId(e.target.value)}/>
            <br/>

            FeedId<br/>
            <input type="text"className="form-control col-4" value={feedId} onChange={(e) => setFeedId(e.target.value)}/>
            

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => Edit(e)}
                >
                Edit
                </Button>
            
        </MDBCardBody>
        </MDBCard>
    </Box>
    </div>
    );
}