const mongoose = require('mongoose');

const advertisementsSchema = new mongoose.Schema({
  
    id_number: {type: Number},

    name_advertisement: {type: String},

    link:{type: String},

    image_advertisement:{type: String},

    posision:{type: Number},
    
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000)},
    updated_at:{type: Number, default: parseInt (new Date().getTime() / 1000)},
});

const Advertisements = mongoose.model('advertisements', advertisementsSchema)

module.exports = { Advertisements };