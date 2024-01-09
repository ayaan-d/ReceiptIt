import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextInput } from "@tremor/react";


export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      })

      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const paperStyle = { padding: 20, height: '40vh', minHeight: '350px', width: '20vw', minWidth: '300px', margin: "20px auto" }
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
      <Grid xs={5}></Grid>
      <Grid xs={2} xl={2}>
        <Paper elevation={3} style={paperStyle} >
          <Grid className='spacing' align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={loginUser}>
            <Grid className='spacing' style={{paddingTop: '5%'}}>
              <TextInput className='input' placeholder="Email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
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
              <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onSubmit={loginUser}>Sign in</Button>
            </Grid> </form>

          {/* <Typography >
            <Link href="#" >
              Forgot password ?
            </Link>
          </Typography> */}
          <Grid className='spacing' style={{paddingTop: '12%'}}>
          <Typography > Don't have an account? &nbsp;
            <Link href="/register" >
              Sign Up
            </Link>
          </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={5}></Grid>



    </div>
  )
}
