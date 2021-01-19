const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
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

mongoose.model('Product', productSchema);
