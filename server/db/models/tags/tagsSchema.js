const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
    
    id_number: { type: Number },

    name_tag:{ type: String },

    link: { type: String },

    created_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) }
});

const Tags = mongoose.model('tags', tagsSchema)

module.exports = { Tags };