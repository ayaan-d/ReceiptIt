import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import { Col, List, ListItem } from "@tremor/react";
import { Card, DonutChart, Title, Metric, Text, Bold, Italic } from "@tremor/react";
import {
  Grid,
  Tab,
} from "@tremor/react";
import axios from 'axios';
import './Dashboard.css'
// import {getMostVisitedMerchant} from '../../../../server/controllers/uploadController.js'



export default function Dashboard() {

  const { user } = useContext(UserContext)
  const [selectedFile, setSelectedFile] = useState(null);
  const userEmail = user.email;
  console.log("dashboard file: ", userEmail);

  const [ dashboardData, setDashboardData ] = useState(null);

  useEffect(() => {
    async function fetchData(){
      try {
        const email = user.email;
        const response = await axios.get('/dash', {
          params: {
            uEmail: email
          }
        });
        console.log("response data")
        console.log(response.data)
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchData();
  }, []);

  const chooseFile = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const removeFile = () => {
    setSelectedFile(null);
    document.getElementById('file-input').value = '';
    toast.success('File removed');
  }

  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('receipt', selectedFile);
    formData.append('email', user.email);

    try {
     await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
      toast.success('File uploaded!');
    } catch (error) {
      toast.error('Error uploading receipt. Try again.');
      console.error('Error uploading file:', error);
    }
  };


  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  const purchases = [
    {
      item: "Eggs",
      price: "$300",
    },
    {
      item: "Milk",
      price: "$40",
    },
    {
      item: "most visited",
      price: dashboardData.mostVisitedMerchant,
    }
  ];

  const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;


  return (




    <div id='dashboard'>


      <main>      
        {!!user && <Title id='welcome'><Bold>Welcome <Italic style={{color:'indigo'}}>{user.name}</Italic></Bold> </Title>}
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>


        <Card className="max-w-lg">
          <Title>Sales</Title>
          <DonutChart
            className="mt-6"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>


        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="cyan">
          <Text>Last Month's Top Merchant</Text>
          <Metric>$</Metric>
        </Card>

        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="slate">
          <Text>Total spent this month</Text>
          <Metric></Metric>
        </Card>

        <Card className="max-w-xs">
          <Title>Recent Purchases</Title>
          <List>
            {purchases.map((purchase) => (
              <ListItem key={purchase.item}>
                <span>{purchase.item}</span>
                <span>{purchase.price}</span>
              </ListItem>
            ))}
          </List>
        </Card>

      </main>


      {/* <h1>Dashboard</h1>
      {!!user && (<h2>Hi {user.name} </h2>)}
      <h1>Receipt Upload Page</h1>
      <input id="file-input" type="file" onChange={chooseFile} />
      <button onClick={uploadFile}>Upload</button>
      <button onClick={removeFile}>Remove File</button> */}













    </div>
  )
}