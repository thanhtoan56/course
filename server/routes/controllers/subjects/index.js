const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "subjects";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Subjects } = require('../../../db/models/subjects/subjectsSchema');

const check = require('../functions/general')
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//find all categories
router.get('/list-subjects', async (req, res) => {
    await Subjects.find({},{ _id:0}).sort({"id_number": -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

router.post('/add-subject', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, subjectName, subjectCode } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})

    const subjectCodeDefind = await Subjects.findOne({"subjectCode": subjectCode});
    if(subjectCodeDefind) return res.status(200).json({"successes":false, "reason":"Subject Code is used"});
    
    const subject = new Subjects({
        "idNumber": index,
        "subjectName": subjectName,
        "subjectCode": subjectCode
    });
    await subject.save(async (err, data) => {
        if(err || !data) return res.status(200).json({"success":false, "reason": "Error Lỗi ở đây!!"})

        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true})
    });
});

router.post('/update-subject', async (req,res) =>{
    const { token, idNumber, subjectName, subjectCode } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    // Kiem tra idNumber gui len có khop vơi subjectCode hay không
    const subjectDefind = await Subjects.findOne({"idNumber": idNumber});
    if(!subjectDefind) return res.status(200).json({"successes":false, "reason":"Subject is not define"});
    
    // Kiem tra code đã dùng chưa
    if(subjectDefind.subjectCode !== subjectCode){
        const subjectCodeDefind = await Subjects.findOne({"subjectCode": subjectCode});
        if(subjectCodeDefind) return res.status(200).json({"successes":false, "reason":"Subject Code is used"});
    }

    var subject = {
        "subjectName": subjectName,
        "subjectCode": subjectCode,
    };
    
    await Subjects.findOneAndUpdate({"idNumber":idNumber}, subject, {new: true}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    }); 
});

router.post('/remove-subject',async (req,res) =>{
    
    const {token, idNumber} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    await Subjects.findOneAndRemove({"idNumber":idNumber}).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        return res.status(200).json({"successes":true})
    });
});

module.exports = router