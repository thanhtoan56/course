const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
    
    id_number: { type: Number },

    buyer_fullname: {type: String},

    buyer_phonenumber:{ type: Number},

    buyer_address: { type: String},

    list_product: {type: String},

    total_pay: { type: Number },

    user_id: { type: Number },

    // confirm
    buyer_confirm: {type: Boolean, default: true},

    seller_confirm: {type: Boolean, default: false},

    // state
    cancelled: {type: Number, default: 0},

    completed: {type: Boolean, default: false},

    // check time cancel 
    created_timestamp: {type: Number},
});

const Payments = mongoose.model('payments', paymentsSchema)

module.exports = { Payments };