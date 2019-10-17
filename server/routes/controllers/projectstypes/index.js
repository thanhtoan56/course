const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "projectstypes";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Projectstypes } = require('../../../db/models/projectstype/projectstypeSchema');
const { Subjects } = require('../../../db/models/subjects/subjectsSchema');

const tool_insert_index_collection = require('../functions/insert_index_collection');
const check  = require('../functions/general')

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// get all
router.get('/list-projectstype', async (req, res) => {
    await Projectstypes.find({},{ _id:0}).sort({"idNumber": -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

// get project type by subjectCode
router.post('/list-projectstype-by-subjectcode', async (req, res) => {
    const { subjectCode } = req.body;
    await Projectstypes.find({"subjectCode":subjectCode},{ _id:0})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

router.post('/add-projectstype', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const {token, projectTypeName, subjectCode } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a" && checkUser.headOfChemistry != "y") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    if( !projectTypeName ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})

    var subject = await Subjects.findOne({"subjectCode": subjectCode})
    if(!subject) return res.status(200).json({"successes":false, "reason":"subject is not define"});
    
    const projectstype = new Projectstypes({
        "idNumber": index,
        "projectTypeName": projectTypeName,
        "subjectCode": subjectCode,
        "subjectName": subject.subjectName 
    });
    await projectstype.save(async (err, data) => {
        if(!data) return res.status(200).json({"successes":false, "reason": "Error!!"})

        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true})
    });
});

router.post('/update-projectstype', async (req,res) =>{
    
    const {token, idNumber, projectTypeName } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a" && checkUser.headOfChemistry != "y") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    if(!idNumber || !projectTypeName ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var projectstype = {
        "projectTypeName": projectTypeName 
    };
    await Projectstypes.findOneAndUpdate({"idNumber":idNumber}, projectstype, {new: true}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    }); 
});

router.post('/remove-projectstype',async (req,res) =>{
    
    const {token, idNumber } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a" && checkUser.headOfChemistry != "y") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    await Projectstypes.findOneAndRemove({"idNumber":idNumber}).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        return res.status(200).json({"successes":true})
    });
});

module.exports = router