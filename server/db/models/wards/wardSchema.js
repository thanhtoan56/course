const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    
    wardid: {type: String, required: true,},
    
    name:{type: String, required: true,},
    
    districtid:{type: String, required: true,},
});

const Wards = mongoose.model('wards', wardSchema)

module.exports = { Wards };