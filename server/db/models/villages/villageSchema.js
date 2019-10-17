const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
    
    wardid: {type: String, required: true,},
    
    name:{type: String, required: true,},
    
    districtid:{type: String, required: true,},
});

const Village = mongoose.model('villages', villageSchema)

module.exports = { Village };