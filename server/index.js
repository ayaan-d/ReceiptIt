const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

const port = 8000;

app.use('/', require('./routes/authRoutes'))

app.listen(port, () => console.log('Server is running on port 8000'));

