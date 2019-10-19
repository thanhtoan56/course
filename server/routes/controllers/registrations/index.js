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


// get project type by subjectCode
router.post('/list-registration-by-subjectcode', async (req, res) => {
    // const { subjectCode } = req.body;
    // await Projects.find({"subjectCode":subjectCode},{ _id:0}).sort({idNumber: -1})
    // .then(result => res.status(200).json({"successes":true,"data":result}))
    // .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

router.post('/add-registration', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, members, projects} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var arrType = []
    var isListUser = []
    for(let i = 0; i < projects.length; i++){  
        arrType.push(projects[i].idNumberProjectType)
    }
    var types = [...new Set(arrType)]

    if(types.length != 1) return res.status(200).json({"successes":false,"reason":"Select the correct topic type when registering"})

    var registrations = await Registrations.find({"idNumberProjectType": types[0]})
    if(!registrations) return res.status(200).json({"successes":false, "reason":"Registrations is not define"});

    for(let i = 0; i < registrations.length; i++){ 
        for(let j = 0; j < registrations[i].members.length; j++){  
            if(registrations[i].members[j].memberCode == checkUser.code) isListUser.push(1)
        }
    }
    if(isListUser.length > 0) return res.status(200).json({"successes":false,"reason":"You are already registered"})
    
    // if(checkUser.decentralise == "s" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    // if(checkUser.code != teacherCode || !token || !teacherCode) return res.status(200).json({"successes":false,"reason":"User invalid"})
    // if( !subjectCode || !idNumberProjectType || !projectTypeName || !projectName || !projectTarget || !projectRequire ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})

    // var subject = await Subjects.findOne({"subjectCode": subjectCode})
    // if(!subject) return res.status(200).json({"successes":false, "reason":"subject is not define"});
    
    const registration = new Registrations({
        // "idNumber": index,
        "idNumberProjectType": projects[0].idNumberProjectType,
        "members": members,
        "projects":projects
    });
    return res.status(200).json({"successes":true, "data":registration})
    // await project.save(async (err, data) => {
    //     if(!data) return res.status(200).json({"successes":false, "reason": "Error!!"})

    //     await tool_insert_index_collection.update_index_collection(name_collection, index);
    //     return res.status(200).json({"successes":true})
    // });
});

router.post('/remove-registration',async (req,res) =>{
    
    // const {token, idNumber } = req.body;

    // const checkToken = await check.checkToken(token)
    // if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    // const checkUser = checkToken.data;

    // if(checkUser.decentralise != "a" && checkUser.headOfChemistry != "y") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    // await Registrations.findOneAndRemove({"idNumber":idNumber}).exec( (err,data) => {
    //     if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
    //     return res.status(200).json({"successes":true})
    // });
});

module.exports = router
