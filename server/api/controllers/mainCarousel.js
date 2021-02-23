const mongoose = require('mongoose');
const MainCarouselModel = mongoose.model('MainCarousel');

module.exports.getMainCarousel = (req, res) => {
    MainCarouselModel.find().then(data => {
        let message = "";
        if (data === undefined || data.length === 0) {
            message = "Nothing found"
        } else {
            message = "Main Carousel successfully retrieved"
        }

        res.send({
            success: true,
            message: message,
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving products."
        });
    })
};
