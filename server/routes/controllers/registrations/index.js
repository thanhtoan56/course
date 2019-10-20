const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "registrations";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Subjects } = require('../../../db/models/subjects/subjectsSchema');
const { Projectstypes } = require('../../../db/models/projectstype/projectstypeSchema');
const { Projects } = require('../../../db/models/projects/projectsSchema');
const { Registrations } = require('../../../db/models/registrations/registrationsSchema');

const check  = require('../functions/general')
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// get registration for teacher
router.post('/list-registration-teacher', async (req, res) => {
    const { subjectCode, teacherCode } = req.body;
    await Registrations.find({"subjectCode":subjectCode, "teacherCode": teacherCode},{ _id:0, __v:0}).sort({idNumber: -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

// get registration for student
router.post('/list-registration', async (req, res) => {
    const { subjectCode, leaderCode } = req.body;

    var result = []
    var registrations = await Registrations.find({"subjectCode":subjectCode},{ _id:0, __v:0}).sort({idNumber: -1})

    for(let i = 0; i < registrations.length; i++){ 
        for(let j = 0; j < registrations[i].members.length; j++){  
            if(registrations[i].members[j].memberCode == leaderCode) result.push(registrations[i])
        }
    }
    return res.status(200).json({"successes":true, "data":result}) 
});

router.post('/add-registration', async (req, res) => {
    var arrType = []
    var isListUser = []

    const { token, members, projects} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    //Check type project
    for(let i = 0; i < projects.length; i++){  
        arrType.push(projects[i].idNumberProjectType)
    }
    var types = [...new Set(arrType)]
    if(types.length != 1) return res.status(200).json({"successes":false,"reason":"Select the correct topic type when registering"})

    // Check registered
    var registrations = await Registrations.find({"idNumberProjectType": types[0]})
    if(!registrations) return res.status(200).json({"successes":false, "reason":"Registrations is not define"});

    for(let i = 0; i < registrations.length; i++){ 
        for(let j = 0; j < registrations[i].members.length; j++){  
            if(registrations[i].members[j].memberCode == checkUser.code) isListUser.push(1)
        }
    }
    if(isListUser.length > 0) return res.status(200).json({"successes":false,"reason":"You or member your team are already registered"})
    
    
    for(let i = 0; i < projects.length; i++){
        var index = 0;
        const result = await indexS.findOne({'nameCollection': name_collection});
        if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
        else { index = result.index; }

        const registration = new Registrations({
            "subjectName": projects[i].subjectName,
            "subjectCode": projects[i].subjectCode,

            "idNumberProjectType": projects[i].idNumberProjectType,
            "projectTypeName": projects[i].projectTypeName,

            "projectName": projects[i].projectName,
            "projectCode": projects[i].projectCode,

            "teacherCode": projects[i].teacherCode,
            "teacherName": projects[i].teacherName,

            "projectTarget": projects[i].projectTarget,
            "projectRequire": projects[i].projectRequire,

            "idNumber": index,
            "leaderCode": checkUser.code,
            "leaderName": checkUser.fullName, 
            "members": members
        });
        await registration.save();
        await tool_insert_index_collection.update_index_collection(name_collection, index);
    }
    
    return res.status(200).json({"successes":true})
});

router.post('/remove-registration',async (req,res) =>{
    
    // await Registrations.findOneAndRemove({"idNumber":idNumber}).exec( (err,data) => {
    //     if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
    //     return res.status(200).json({"successes":true})
    // });
});

module.exports = router
