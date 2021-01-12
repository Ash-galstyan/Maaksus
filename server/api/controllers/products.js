const mongoose = require('mongoose');
const ProductModel = mongoose.model('Product');

module.exports.getProducts = (req, res) => {
    debugger;
    ProductModel.find().then(data => {
        let message = "";
        if (data === undefined || data.length === 0) {
            message = "No product found"
        } else {
            message = "Products successfully retrieved"
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
