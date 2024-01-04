const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

//database connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/', require('./routes/authRoutes'));

app.listen(port, () => console.log('Server is running on port 8000'));

