import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@mui/material/styles';
import DeveloperService from '../services/DeveloperService';
import {MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardLink,MDBListGroupItem} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar() {

 // const[responses, setResponses] = useState([]);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    //init();
        DeveloperService.getAllFeeds()
            .then(response => {
              console.log('displayin feeds', response.data);
              setFeeds(response.data);

            })
            .catch(error => {
                console.log('Feed not found', error);
            })
        }, [])
  return (<>
      

    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} theme={darkTheme}>
          DashBoard
        </Typography>
        <MDBCard>
      <MDBCardBody>
        {
          feeds.map(feed => (
            <>
            <MDBCardTitle key={feed.feedId}>
            {feed.feedId}. {feed.topic}
            </MDBCardTitle>
            <MDBCardText>
            {feed.query}
            </MDBCardText>

         <Button href="/ViewResponse">View responses</Button>
         
            <br/>
            <Button href="/AddResponse">Add response</Button>
            <br/>
            <MDBCardLink href='#' >Like</MDBCardLink>
            <MDBIcon fas icon="thumbs-up" />
            <br/>
            <br/><br/>
            </>
          ))
          
        }
        
      </MDBCardBody>
    </MDBCard>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          
          <StyledFab color="secondary" aria-label="add" href='/Addquery'>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 ,
           bgcolor: 'background.default',}} />
          
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </>
  );
}