// import React from 'react'
// import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { TextInput } from "@tremor/react";
// import './Login.css'
// const LoginComp=()=>{

//     const paperStyle={padding :20,height:'70vh', minimumWidth:'1000px', width: '40vw', margin:"20px auto"}
//     const avatarStyle={backgroundColor:'#1bbd7e'}
//     const btnstyle={margin:'8px 0'}
//     return(
//         <Grid>
//             <Paper elevation={3} style={paperStyle} >
//                 <Grid align='center'>
//                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
//                     <h2>Sign In</h2>
//                 </Grid>
//                 <TextInput placeholder="Email" type="email"/>
//                 <TextInput placeholder="Password" type="password" required />
//                 <FormControlLabel
//                     control={
//                     <Checkbox
//                         color="primary"
//                     />
//                     }
//                     label="Remember me"
//                  />
//                 <Button type='submit' color='primary' variant="contained" square={false} style={btnstyle} fullWidth>Sign in</Button>
//                 <Typography >
//                      <Link href="#" >
//                         Forgot password ?
//                 </Link>
//                 </Typography>
//                 <Typography > Do you have an account ?
//                      <Link href="#" >
//                         Sign Up 
//                 </Link>
//                 </Typography>
//             </Paper>
//         </Grid>
//     )
// }

// export default LoginComp;