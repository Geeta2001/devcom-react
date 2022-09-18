import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeNav from '../../components/HomeNav';
import { useState } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©  '}
      <Link color="inherit" href="">
        DevCom
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();

  const[userName, setUserName] = useState('');
  const[password, setPassword] = useState('');
  const[blocked] = useState('');
  const[errors, setErrors] = useState('');

  const loginUser = (e) => {
    e.preventDefault();

    const data = {userName, password};
    const errors = validate({...data});
    if(Object.keys(errors).length === 0){
      UserService.login(data)
      .then(response => {
        if (data.blocked == true) {
          console.log(blocked.toString());
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `User is Blocked`,
            showConfirmButton: false,
            timer: 9000
          });
        }

        if(userName=="admin@admin.com"){
          console.log("Admin login successful", JSON.stringify(response.data));
        localStorage.setItem('userId', response.data);
        console.log(localStorage.getItem('userId'));
        Swal.fire({
          icon: 'success',
          title: 'Admin Logged in!',
          text: `Admin Login Successful.`,
          showConfirmButton: false,
          timer: 3000
      });
        navigate("/AdminPage");
        }
        else{
          console.log("user login successful", JSON.stringify(response.data));
          localStorage.setItem('userId', response.data);
          console.log(localStorage.getItem('userId'));
          localStorage.setItem('userName', data.userName);
          Swal.fire({
            icon: 'success',
            title: 'Logged in!',
            text: `Login Successful.`,
            showConfirmButton: false,
            timer: 3000
          });
          navigate("/dashboard");
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Invalid Credentials`,
          showConfirmButton: false,
          timer: 3000
      });
        console.log("user login failed", error);       
      })
    }
    else{
      setErrors(errors);
    }
  }

  return (<>
  <HomeNav/>
  <br/><br/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Login
            </Typography>
              
              <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user_name"
                label="userName"
                name="userName"
                autoComplete="userName"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.userName && <p style={{color:'red'}}>{errors.userName}</p>}
              </Grid>

              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                href='/dashboard'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginUser}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:3000/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );

  function validate({userName, password}) {
    let errors = {};
    if (!userName) {
      errors.userName = 'Username required';
    } else if (!/\S+@\S+\.\S+/.test(userName)) {
      errors.userName = 'Username is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } 
    return errors;
  }
};