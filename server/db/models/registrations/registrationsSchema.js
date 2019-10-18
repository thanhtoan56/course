const mongoose = require('mongoose');

const registrationsSchema = new mongoose.Schema({

    idNumber: {type: Number},
    leaderCode: {type: String },
    leaderName: {type: String },

    members: { type: Array, default: []},   // [{memberCode:    String, memberName: String}]
    projects: { type: Array, default: []},  // [{idProject:     Number, state:      default: 0}]
  
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },
    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Registrations = mongoose.model('registrations', registrationsSchema)

module.exports = { Registrations };