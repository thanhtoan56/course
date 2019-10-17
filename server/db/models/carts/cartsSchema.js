const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
  
    appId: {type: String},

    idProduct: {type: Number},

    quantity:{type: Number},

    createdCart:{ type: Number },

    created_at:{type: Number },

    // created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000)},

    // updated_at:{type: Number, default: parseInt (new Date().getTime() / 1000)},
});

const Carts = mongoose.model('carts', cartsSchema)

module.exports = { Carts };