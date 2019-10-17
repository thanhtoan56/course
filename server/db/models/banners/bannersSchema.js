const mongoose = require('mongoose');

const bannersSchema = new mongoose.Schema({
    
    id_number: { type: Number },

    name_banner:{type: String, required: true},

    image_banner: {type: String},

    url: { type: String },
    
    type:{ type: Number },
    
    created_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) }
});

const Banners = mongoose.model('banners', bannersSchema)

module.exports = { Banners };