const mongoose = require('mongoose');

const authenticationsSchema = new mongoose.Schema({

    code: { type: String },
    
    user_id: {type: String },
    
    type: {type: String, default: "null"},
    
    created_at:{ type: Number, default: parseInt(new Date() / 1000)},
});

const Authentications = mongoose.model('authentications', authenticationsSchema)

module.exports = { Authentications };