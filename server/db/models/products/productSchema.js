const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  
    id_number: {type: Number},

    name_product:{type: String, required: true,},

    link: {type: String},

    id_categories: {type: Number},

    description:{type: String},

    brand:{ type: String},

    size:{type: String, default: ""},

    total_quantity: {type: Number, default: 0},

    material:{type: String, default: ""},

    capacity:{type: String, default: ""},

    made:{ type: String, default: ""},

    type:{type: String},

    detail:{type: String, default: ""},
    
    add_info: {type: String, default: ""},

    color:{type: String},

    sex:{type: String, default: ""},

    sku: {type: String, default: ""},

    price_origin:{type: Number},

    price_promotion: {type: Number, default: ""},

    image_main: {type: String},

    user_id: {type: Number},

    tags: {type: String},

    showIndex: {type: Boolean, default: false},

    freeShip: {type: Boolean, default: false},

    specifications: {type: String},

    created_at:{ type: Number },

    updated_at:{type: Number, default: parseInt (new Date().getTime() / 1000)},
});

const Products = mongoose.model('product', productSchema)

module.exports = { Products };