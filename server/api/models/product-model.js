const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    productName: String,
    articleNumber: String,
    artist: String,
    style: String,
    availability: String,
    price: Number,
    width: Number,
    height: Number,
    img: String,
    artistDescription: String,
    category: String
});

const popularProductsSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    articleNumber: String,
    artist: String,
    style: String,
    availability: String,
    price: Number,
    width: Number,
    height: Number,
    img: String,
    artistDescription: String
});

mongoose.model('Product', productSchema);
mongoose.model('PopularProducts', popularProductsSchema, 'popularProducts');
