import { Link } from 'react-router-dom';
// import * as style from "./Navbar";
import {
  // Card,
  Flex,
  // Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";

import "../pages/Home.css"


export default function Navbar() {

  return (
<nav id="navbar" className="">
   <div className="nav-wrapper">
      {/* <div className="logo">
         <img className="logo" src="https://cdn.glitch.me/4138ce3b-24ae-49a3-bd13-8f07d69684f5/b66ab14de4dccbb0fb5a28ca79ed81c0-justice-scale-circle-icon.png?v=1639814780739" height="40px" 
        //  <input onClick="document.getElementById('landing').scrollIntoView();" />
      </div> */}

<TabGroup>
        <TabList className="mt-8">
          <Link className="link" to='/'><Tab>Home</Tab></Link>
          <Link className="link" to='/login'><Tab>Login</Tab></Link>
          <Link className="link" to='/register'><Tab>Register</Tab></Link>
          <Link className="link" to='/upload'><Tab>Upload</Tab></Link>
        </TabList>
      </TabGroup>
   </div>
</nav>
  )
}
