const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
    
    idNumber: {type: Number},

    subjectName: {type: String, required: true},

    subjectCode: {type: String, required: true},
  
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Subjects = mongoose.model('subjects', subjectsSchema)

module.exports = { Subjects };