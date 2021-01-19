const mongoose = require('mongoose');
const TestimonyModel = mongoose.model('Testimony');

module.exports.getTestimonies = (req, res) => {
    debugger;
    TestimonyModel.find().then(data => {
        let message = "";
        if (data === undefined || data.length === 0) {
            message = "No testimony found"
        } else {
            message = "Testimonies successfully retrieved"
        }

        res.send({
            success: true,
            message: message,
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving testimonies."
        });
    })
};
