const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    
    id_number: { type: Number },

    payment_id: {type: Number},

    list_product: {type: String},

    total_pay: {type: Number},

    user_id: { type: Number },

    // confirm
    seller_confirm: {type: Boolean, default: false},

    // state
    cancelled: {type: Number, default: 0},

    completed: {type: Boolean, default: false},

    // info buyer
    buyer_id: { type: Number},

    buyer_fullname: {type: String},

    buyer_phonenumber:{ type: Number},

    buyer_address: { type: String},
    
    created_timestamp: {type: Number},
});

const Orders = mongoose.model('orders', ordersSchema)

module.exports = { Orders };