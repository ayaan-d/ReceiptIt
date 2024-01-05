import {useState} from 'react';
import {useContext} from 'react';
import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export default function Dashboard() {

    const [selectedFile, setSelectedFile] = useState(null);
    const {user} = useContext(UserContext)
    
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
            <h1>Dashboard</h1>
            {!!user &&(<h2>Hi {user.name} </h2>)}
            <h1>Receipt Upload Page</h1>
            <input id="file-input" type="file" onChange={chooseFile} />
            <button onClick={uploadFile}>Upload</button>
            <button onClick={removeFile}>Remove File</button>
        </div>
    )
}