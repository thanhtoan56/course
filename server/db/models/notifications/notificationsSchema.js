const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
  
    id_number: {type: Number},

    title: {type: String},

    content:{type: String},
    
    user_id:{type: Number},

    payment_id: {type: Number, default: 0},

    isReaded: {type: Boolean, default: false},

    created_at:{ type: Number},
});

const Notifications = mongoose.model('notifications', notificationsSchema)

module.exports = { Notifications };