import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';
import { Col, List, ListItem } from "@tremor/react";
import {
  Card,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from "@tremor/react";
import axios from 'axios';



export default function Dashboard() {

  const purchases = [
    {
      item: "Eggs",
      price: "$300",
    },
    {
      item: "Milk",
      price: "$40",
    },
  ];


  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(UserContext)

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

  return (




    <div>

      
    <main>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
     
            <Grid numItems={2}>
              <Col>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              </Col>
              <Col numColSpan={2}>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              </Col>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
    </main>
  );


      <h1>Dashboard</h1>
      {!!user && (<h2>Hi {user.name} </h2>)}
      <h1>Receipt Upload Page</h1>
      <input id="file-input" type="file" onChange={chooseFile} />
      <button onClick={uploadFile}>Upload</button>
      <button onClick={removeFile}>Remove File</button>







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





    </div>
  )
}