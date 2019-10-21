const mongoose = require('mongoose');

const registrationsSchema = new mongoose.Schema({

    subjectName: {type: String},
    subjectCode: {type: String},

    idNumberProjectType: {type: Number },
    projectTypeName: {type: String },

    projectName: {type: String },
    projectCode: {type: String },

    teacherCode: {type: String },
    teacherName: {type: String },

    projectTarget: {type: String },
    projectRequire: {type: String },

    idNumber: {type: Number},
    leaderCode: {type: String },
    leaderName: {type: String }, 
    members: { type: Array, default: []},   // [{memberCode:    String, memberName: String}]
    state: { type: Number, default: 0}, // 0: start, 1: confirm, 2: no-confirm
  
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },
    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Registrations = mongoose.model('registrations', registrationsSchema)

module.exports = { Registrations };