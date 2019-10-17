const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({

    districtid: {type: String, required: true,},
    
    name:{type: String, required: true,},
    
    provinceid:{type: String, required: true,},
});

const Districts = mongoose.model('districts', districtSchema)

module.exports = { Districts };