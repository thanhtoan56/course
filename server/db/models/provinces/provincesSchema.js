const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    
    provinceid: {type: String, required: true,},
    
    name:{type: String, required: true,},
});

const Provinces = mongoose.model('provinces', provinceSchema)

module.exports = { Provinces };