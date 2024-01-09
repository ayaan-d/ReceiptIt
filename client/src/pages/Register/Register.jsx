import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextInput } from "@tremor/react";

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = data
    try {
      const {data} = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login successful. Welcome!')
        navigate('/login')
        //can we navigate the user straight to the dashboard?
        // further development, a set up screen where they choose their budget etc
      }
    } catch (error) {
      console.log(error)
    }
  }
  const paperStyle = { padding: 20, height: '45vh', minHeight: '400px', width: '20vw', minWidth: '300px', margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#2e8cca' }
  const btnstyle = { margin: '8px 0' }
  return (
    //   <div id='loginDiv'>
    //      <form onSubmit={loginUser}>
    //   <label> Email </label>
    //   <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data,email: e.target.value})}/>

    //   <label> Password </label>
    //   <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>

    //   <button type='submit'> Login </button>
    // </form>
    // </div>
    <div id='loginDiv'>
      <Grid>
        <Paper elevation={3} style={paperStyle} >
          <Grid className='spacing' align='center'>
            <Avatar style={avatarStyle}><AppRegistrationIcon /></Avatar>
            <h2>Register</h2>
          </Grid>
          <form onSubmit={registerUser}>
            <Grid className='spacing' style={{paddingTop: '5%'}}>
              <TextInput className='input' placeholder="Email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </Grid>
            <Grid className='spacing'>
              <TextInput placeholder="Username" type="text"  value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
            </Grid>
            <Grid className='spacing'>
              <TextInput placeholder="Password" type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </Grid>{/* <FormControlLabel
            control={
              <Checkbox
                color="primary"
              />
            }
            label="Remember me"
          /> */}
            <Grid className='spacing' style={{paddingTop: '5%'}}>
              <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onSubmit={registerUser}>Sign Up</Button>
            </Grid> </form>

          {/* <Typography >
            <Link href="#" >
              Forgot password ?
            </Link>
          </Typography> */}
          <Grid className='spacing' style={{paddingTop: '8%'}}>
          <Typography > Already have an account? &nbsp;
            <Link href="/login" >
              Sign in
            </Link>
          </Typography>
          </Grid>
        </Paper>
      </Grid>

    </div>

// <div>
// <form onSubmit={registerUser}>
//   <label> Name </label>
//   <input type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
  
//   <label> Email </label>
//   <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

//   <label> Password </label>
//   <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>

//   <button type='submit'> Submit </button>
// </form>
// </div>
  )
}
