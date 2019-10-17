const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  
    id_product: {type: Number},

    filename: {type: String},

    size:{type: Number},

    type: {type: String},

    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000)},

    updated_at:{type: Number, default: parseInt (new Date().getTime() / 1000)},
});

const Images = mongoose.model('images', imagesSchema)

module.exports = { Images };