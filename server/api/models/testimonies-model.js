const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    id: Number,
    clientName: String,
    reviewedVia: String,
    review: String,
    clientImage: String
});

mongoose.model('Testimony', testimonySchema);
