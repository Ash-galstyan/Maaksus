const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET;
require('dotenv').config();
const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlProducts = require('../controllers/products');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Products
router.get('/products', ctrlProducts.getProducts);

const auth = jwt({
    secret: secret,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/profile', auth, ctrlProfile.profileRead);
module.exports = router;
