const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "projects";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Projectstypes } = require('../../../db/models/projectstype/projectstypeSchema');
const { Subjects } = require('../../../db/models/subjects/subjectsSchema');
const { Projects } = require('../../../db/models/projects/projectsSchema');

const tool_insert_index_collection = require('../functions/insert_index_collection');
const check  = require('../functions/general')

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// get project for teacher by subjectCode
router.post('/list-project-by-subjectcode', async (req, res) => {
    const { token, subjectCode } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise == "a" || checkUser.headOfChemistry == "y" ){
        await Projects.find({"subjectCode":subjectCode},{ _id:0, __v:0}).sort({idNumber: -1})
        .then(result => res.status(200).json({"successes":true,"data":result}))
        .catch((err) => res.status(200).json({"successes":false,"reason":err}));
    } else {
        await Projects.find({"subjectCode":subjectCode, "teacherCode": checkUser.code},{ _id:0, __v:0}).sort({idNumber: -1})
        .then(result => res.status(200).json({"successes":true,"data":result}))
        .catch((err) => res.status(200).json({"successes":false,"reason":err}));
    }
});

// get project for student isRatify == "Y"  by subjectCode
router.post('/list-project', async (req, res) => {
    const { subjectCode } = req.body;
    await Projects.find({"subjectCode":subjectCode, isRatify: "Y"},{ _id:0, __v:0}).sort({idNumber: -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

router.post('/add-project', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, subjectCode, idNumberProjectType, projectTypeName, projectName, teacherCode, projectTarget, projectRequire } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise == "s" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    if(checkUser.code != teacherCode || !token || !teacherCode) return res.status(200).json({"successes":false,"reason":"User invalid"})
    if( !subjectCode || !idNumberProjectType || !projectTypeName || !projectName || !projectTarget || !projectRequire ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})

    var subject = await Subjects.findOne({"subjectCode": subjectCode})
    if(!subject) return res.status(200).json({"successes":false, "reason":"subject is not define"});
    
    const project = new Projects({
        "subjectName": subject.subjectName,//
        "subjectCode": subjectCode,//
        "idNumberProjectType": idNumberProjectType,//
        "projectTypeName": projectTypeName,//

        "idNumber": index,
        "projectName": projectName,//
        "projectCode": `${subjectCode}.${index}`,//
        "teacherCode": checkUser.code,//
        "teacherName": checkUser.fullName,//
        "projectTarget": projectTarget,//
        "projectRequire": projectRequire,//
    });
    await project.save(async (err, data) => {
        if(!data) return res.status(200).json({"successes":false, "reason": "Error!!"})

        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true})
    });
});

router.post('/update-project', async (req,res) =>{
    
    const { token, idNumber, idNumberProjectType, projectTypeName, projectName, projectTarget, projectRequire } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var projectDefine = await Projects.findOne({"idNumber": idNumber})
    if(!projectDefine) return res.status(200).json({"successes":false, "reason":"project is not define"});

    if(checkUser.code != projectDefine.teacherCode){
        if(checkUser.decentralise != "a" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    }
    
    if( !idNumberProjectType || !projectTypeName || !projectName || !projectTarget || !projectRequire ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    const project = {
        "idNumberProjectType"   : idNumberProjectType,//
        "projectTypeName"       : projectTypeName,//
        "projectName"           : projectName,//
        "projectTarget"         : projectTarget,//
        "projectRequire"        : projectRequire,//
    }
    await Projects.findOneAndUpdate({"idNumber":idNumber}, project, {new: true}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    }); 
});

router.post('/ratify-project', async (req,res) =>{
    
    const { token, idNumber} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var projectDefine = await Projects.findOne({"idNumber": idNumber})
    if(!projectDefine) return res.status(200).json({"successes":false, "reason":"project is not define"});
    
    if(checkUser.decentralise != "a" && checkUser.headOfChemistry != "y" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    await Projects.findOneAndUpdate({"idNumber":idNumber}, {isRatify: "Y"}, {new: true}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    }); 
});

router.post('/remove-project',async (req,res) =>{
    
    const {token, idNumber } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var projectDefine = await Projects.findOne({"idNumber": idNumber})
    if(!projectDefine) return res.status(200).json({"successes":false, "reason":"project is not define"});

    if(checkUser.code != projectDefine.teacherCode){
        if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
    }
    
    await Projects.findOneAndRemove({"idNumber":idNumber}).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        return res.status(200).json({"successes":true})
    });
});

module.exports = router