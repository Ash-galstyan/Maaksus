const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET;
require('dotenv').config();

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

const auth = jwt({
    secret: secret,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/profile', auth, ctrlProfile.profileRead);
