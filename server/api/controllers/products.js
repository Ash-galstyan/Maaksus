const mongoose = require('mongoose');
const ProductModel = mongoose.model('Product');
const PopularProductModel = mongoose.model('PopularProducts');

module.exports.getProducts = (req, res) => {
    ProductModel.find().then(products => {
        let message = "";
        if (products === undefined || products.length === 0) {
            message = "No product found"
        } else {
            message = "Products successfully retrieved"
        }

        res.send({
            success: true,
            message: message,
            products: products
        });
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving products."
        });
    })
};

module.exports.productDetails = (req, res) => {
    ProductModel.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Product successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving product with id " + req.params.id
        });
    });
};

module.exports.getPopularProducts = (req, res) => {
    debugger;
    PopularProductModel.find().then(data => {
        let message = "";
        if (data === undefined || data.length === 0) {
            message = "No product found"
        } else {
            message = "Popular products successfully retrieved"
        }

        res.send({
            success: true,
            message: message,
            popularProducts: data
        });
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving products."
        });
    })
};
