const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    category : String,
    description : String,
    detailedDescription : String,
    price: Number,
    
});

module.exports = mongoose.model('Product', productSchema);
