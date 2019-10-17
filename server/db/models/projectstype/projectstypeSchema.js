const mongoose = require('mongoose');

const projectstypeSchema = new mongoose.Schema({
    
    subjectCode: {type: String, required: true},

    subjectName: {type: String, required: true},

    idNumber: {type: Number},

    projectTypeName: {type: String, required: true },

  
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Projectstypes = mongoose.model('projectstypes', projectstypeSchema)

module.exports = { Projectstypes };