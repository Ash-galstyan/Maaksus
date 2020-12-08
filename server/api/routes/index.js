const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');

const express = require('express');
const router = express.Router();

// profile
router.get('/profile/:userid', ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

const jwt = require('express-jwt');

const auth = jwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    userProperty: 'payload',
    algorithms: ['RS256']
});

router.get('/profile', auth, ctrlProfile.profileRead);
