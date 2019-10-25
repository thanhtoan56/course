const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    
    subjectName: {type: String},
    subjectCode: {type: String},
    idNumberProjectType: {type: Number },
    projectTypeName: {type: String },


    idNumber: {type: Number},
    projectName: {type: String },
    projectCode: {type: String },
    teacherCode: {type: String },
    teacherName: {type: String },
    projectTarget: {type: String },
    projectRequire: {type: String },

    isRatify:{type: String, default: "N"},
  
    created_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) },
    updated_at:{ type: Number, default: parseInt( new Date().getTime() / 1000 ) }
});

const Projects = mongoose.model('projects', projectsSchema)

module.exports = { Projects };