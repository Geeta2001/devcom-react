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
import { Navigate, useNavigate } from 'react-router';
import dashboard from '../../page/Dev/Dashboard';
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
  const[errors, setErrors] = useState('');

  const loginUser = (e) => {
    e.preventDefault();

    const data = {userName, password};
    const errors = validate({...data});
    // console.log("user login error", errors);
    if(Object.keys(errors).length === 0){
      UserService.login(data)
      .then(response => {
        console.log("user login successful", JSON.stringify(response.data));
        localStorage.setItem('userId', response.data);
        console.log(localStorage.getItem('userId'));
        Swal.fire({
          icon: 'success',
          title: 'Logged in!',
          text: `Login Successful.`,
          showConfirmButton: false,
          timer: 4000
      });
        navigate("/dashboard");

      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Login
            </Typography>
              
              <Box component="form" noValidate sx={{ mt: 1 }}>
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
              {errors.userName && <p color='red'>{errors.userName}</p>}

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
              {errors.password && <p>{errors.password}</p>}

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
    if (!userName?.trim()) {
      errors.userName = 'Username required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } 
    return errors;
  }
};