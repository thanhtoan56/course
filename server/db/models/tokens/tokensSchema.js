const mongoose = require('mongoose');

const tokensSchema = new mongoose.Schema({

    idNumber: {type: Number},

    token: {type: String},

    userCode: {type: String},

    created_at:{type: Number, default: parseInt(new Date().getTime()/1000)},
});

const Tokens = mongoose.model('tokens', tokensSchema)

module.exports =  Tokens  ;