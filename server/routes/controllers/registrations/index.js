const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const nodeXlsx = require('node-xlsx');

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
    const { subjectCode, token } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if(checkUser.decentralise == "a" || checkUser.headOfChemistry == "y") {
        await Registrations.find({"subjectCode":subjectCode},{ _id:0, __v:0}).sort({idNumber: -1})
        .then(result => res.status(200).json({"successes":true,"data":result}))
        .catch((err) => res.status(200).json({"successes":false,"reason":err}));
    } else {
        await Registrations.find({"subjectCode":subjectCode, "teacherCode": checkUser.code},{ _id:0, __v:0}).sort({idNumber: -1})
        .then(result => res.status(200).json({"successes":true,"data":result}))
        .catch((err) => res.status(200).json({"successes":false,"reason":err}));
    }
});

// get registration for student
router.post('/list-registration', async (req, res) => {
    const { subjectCode, memberCode } = req.body;

    var result = []
    var registrations = await Registrations.find({"subjectCode":subjectCode},{ _id:0, __v:0}).sort({idNumber: -1})

    for(let i = 0; i < registrations.length; i++){ 
        for(let j = 0; j < registrations[i].members.length; j++){  
            if(registrations[i].members[j].memberCode == memberCode) result.push(registrations[i])
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

router.post('/confirm-registration',async (req,res) =>{
    const { token, idNumber, idNumberProjectType, leaderCode } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;


    var registration = await Registrations.findOne({"idNumber": idNumber})
    if(!registration) return res.status(200).json({"successes":false, "reason":"Registration is not define"});

    if(checkUser.code != registration.teacherCode){
        if(checkUser.decentralise != "a" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    }

    if(registration.state > 0) return res.status(200).json({"successes":false, "reason":"You have either confirmed or canceled"});

    var registrations = await Registrations.find({"idNumberProjectType": idNumberProjectType, "leaderCode":leaderCode})
    if(!registrations) return res.status(200).json({"successes":false, "reason":"Registrations is not define"});
    
    //Cancel the remaining projects
    for(let i = 0; i < registrations.length; i++){ 
        if(registrations[i].idNumber != idNumber && registrations[i].state == 0) await Registrations.findOneAndUpdate({"idNumber":registrations[i].idNumber}, {"state": 2 })
    }

    await Registrations.findOneAndUpdate({"idNumber":idNumber}, {"state": 1 }).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        return res.status(200).json({"successes":true})
    });
});

router.post('/cancel-registration',async (req,res) =>{
    const { token, idNumber, idNumberProjectType, leaderCode } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;


    var registration = await Registrations.findOne({"idNumber": idNumber})
    if(!registration) return res.status(200).json({"successes":false, "reason":"Registration is not define"});

    if(checkUser.code != registration.teacherCode){
        if(checkUser.decentralise != "a" ) return res.status(200).json({"successes":false,"reason":"You not have access"})
    }

    if(registration.state > 0) return res.status(200).json({"successes":false, "reason":"You have either confirmed or canceled"});

    var registrations = await Registrations.find({"idNumberProjectType": idNumberProjectType, "leaderCode":leaderCode})
    if(!registrations) return res.status(200).json({"successes":false, "reason":"Registrations is not define"});
    
    //check state in list registration
    var arrState = []
    for(let i = 0; i < registrations.length; i++){ 
        if(registrations[i].state == 0) arrState.push(registrations[i])
    }
    if(arrState.length == 1 && arrState[0].idNumber == idNumber) return res.status(200).json({"successes":false,"reason":"Can't cancel because they only have this project"})

    await Registrations.findOneAndUpdate({"idNumber":idNumber}, {"state": 2 }).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        return res.status(200).json({"successes":true})
    });
});

// Khi client truy cập router này thì server sẽ export ngay file excel xuống client
router.post('/export-download',async (req, res) => {
    let dataExcel = [];

    const { token, subjectCode, idNumberProjectType } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if(checkUser.decentralise != "a" && checkUser.decentralise != "t") return res.status(200).json({"successes":false,"reason":"You not have access"})

    await Registrations.updateMany({"subjectCode": subjectCode, "idNumberProjectType": idNumberProjectType, "state": 0}, {"state": 1})
    var registrations = await Registrations.find({"subjectCode": subjectCode, "idNumberProjectType": idNumberProjectType, "state": 1}, 
    {_id:0, __v:0, state:0, created_at:0, updated_at:0, idNumberProjectType:0, teacherCode:0, projectTarget:0, projectRequire:0, idNumber:0, members:0})
    
    // Lay du lieu header cho file excel <=> lay cac key name trong collection
    // O day cac key name cua collection user la: userName, email, phone
    let arrHeaderTitle = [];
    Object.keys(registrations[0]['_doc']).forEach(key => {
        arrHeaderTitle.push(key);
    });
    dataExcel.push(arrHeaderTitle);  // push header vao mang dataExcel

    // Lay du lieu cac row tuong ung voi header <=> lay cac value tuong ung voi key name o tren
    for (let item of registrations) {
        let rowItemValue = [];
        Object.keys(item._doc).forEach(key => {
            rowItemValue.push(item[key]);
        });
        dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
    }
    let buffer = nodeXlsx.build([{name: "Registrations", data: dataExcel}]); // Returns a buffer
    fs.writeFile('download/registrations.xlsx', buffer, function (err) {
        if (err) return res.json({"successes":false, reason: err})
        return res.status(200).json({"successes":true, data: "download/registrations.xlsx"})
    });
  });
  
module.exports = router
