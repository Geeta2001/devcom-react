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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



const messages = [

];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});


export default function BottomAppBar() {

  const [feeds, setFeeds] = useState([]);
  // const feed = {feedid, query, topic};

  useEffect(() => {
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
        <Button
          href='/AddDetails'
          
          sx={{ my: 2, color: 'primary', display: 'block' }}
        >
          Add Details
        </Button>
        <Button
          href='/updatedetails'
          
          sx={{ my: 2, color: 'primary', display: 'block' }}
        >
          Profile
        </Button>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} theme={darkTheme}>
          Inbox
        </Typography>
        {/* <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Top Query
                </ListSubheader>
              )}
              {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.default' }}>
                  Most Liked
                </ListSubheader>
              )}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List> */}
        <MDBCard>
      {/* <MDBCardImage position='top' alt='...' src='' /> */}
      <MDBCardBody>
        {
          feeds.map(feed => (
            <>
            <MDBCardTitle key={feed.feedid}>
            {feed.topic}
            </MDBCardTitle>
            <MDBCardText>
            {feed.query}
            </MDBCardText>
            <Button href="/AddResponse">Add response</Button>
            <br/>
            {/* <img alt="0 users liked answer #2" src="https://www.iconpacks.net/free-icon/green-thumbs-up-11246.html" className="thumbs-up h-11 w-11 cursor-pointer opacity-70 hover:opacity-100" loading="lazy"></img> */}
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