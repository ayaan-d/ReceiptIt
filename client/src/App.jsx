import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import axios from 'axios'

axios.default.baseURL = 'http://localhost:8000'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/upload' element={<Upload />} />
    </Routes>
    </>
  )
}

export default App
