const mongoose = require('mongoose');

const mainCarouselSchema = new mongoose.Schema({
    id: String,
    slideName: String,
    artist: String,
    img: String,
    designDescription: String,
    category: String
});

mongoose.model('MainCarousel', mainCarouselSchema, 'mainSlides');
