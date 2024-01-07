
import "./Home.css";
import Grid from '@mui/material/Grid';
import ReceiptSVG from "../../assets/receipt-animate.svg"
import { Link } from 'react-router-dom';
import {
  // Card,
  Flex,
  Col,
  // Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";


import { Image } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <header id="landing">
        <Grid container>
          <Grid id="picdiv" item xs={3}>
            <img id="pic" src={ReceiptSVG}></img>
          </Grid>
          <Grid item xs={6}>
            <Title id="title">Welcome To ReceiptIt</Title>
            <Subtitle id="subtitle" style={{ marginBottom: "1%"}}><Italic>Advice You Can Bank On</Italic></Subtitle>
            <div style={{ marginTop: "2vh"}}>
              <a className="button" href="/login"> Login</a>
              <a className="button" href="/register" style={{ marginLeft: "2%" }}>Register</a>

            </div>
          </Grid>
        </Grid>
      </header>

      {/* <div id="title">
   <h1 style="margin-block-start: 0; margin-block-end: 0;"> About Us</h1>
   </div>
  
<section id="section">
   <div className="container">
      <b> "Become More Than An Investor, Become An Owner With Verve Today"</b>
   </div>
   <p> Verve brings financial security and sustainable outcomes together through affordable investment opportunities for clients.
     At Verve, we believe in creating a diverse and inclusive environment fostering investors, technologists and team members to allow for customer satisfaction. Learn more about why you should choose Verve below.   </p>
</section> */}
    </div>
  )
}

