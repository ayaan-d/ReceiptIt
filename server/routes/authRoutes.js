const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');
const { handleFileUpload } = require('../controllers/uploadController');
const { fetchDashboardInfo } = require('../controllers/dashboardController');
const multer = require('multer');


const upload = multer({ dest: './uploads' });

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/upload', upload.single('receipt'), handleFileUpload)
router.get('/dash', fetchDashboardInfo);

router.get('/profile', getProfile)

module.exports = router
