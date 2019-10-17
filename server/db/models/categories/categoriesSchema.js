const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    
    id_number: {type: Number},

    parent_id: {type: Number},
  
    name_category:{type: String, required: true,},

    link:{type: String},

    image: {type: String},

    tags: {type: String},
    
    description: {type: String},

    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Categories = mongoose.model('categories', categoriesSchema)

module.exports = { Categories };