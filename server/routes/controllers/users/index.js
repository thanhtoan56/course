const express = require('express');
const cron = require('node-cron');
const router = express.Router();
const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');

const bodyParser = require('body-parser');
const sha256 = require('sha256');
const md5 = require('md5');
const name_collection = "users";
const config = require("../../../config/app")
const { checkfield, checkPhoneNumber, checkEmail, checkUserName, validatorPhoneNumber, getUserDetail, getUserDetailByCode } = require('../tools/index')
const { cleanAccents } = require('../functions/format_link');
const bigDecimal = require('js-big-decimal');

const check  = require('../functions/general')

require('../../../db/index');
require('../../../config/auth');
const tool_insert_index_collection = require('../functions/insert_index_collection');
const Users = require('../../../db/models/users/userSchema');
const indexS = require('../../../db/models/indexs/indexsSchema');
const Tokens = require('../../../db/models/tokens/tokensSchema');
const { sendEmail, hashAuthen } = require('../../../config/app');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/files'); },
    
    filename: (async (req, file, cb) => {
        var filetype = file.originalname.split('.')[1];
        cb(null, 'file-' + Date.now() + '.' + filetype);
    })
});

var upload =  multer({storage: storage}).array('files', 1);

function clear_Image(excelFiles){
    for(i = 0; i < excelFiles.length; i++){
        const path = `./uploads/files/${excelFiles[i].filename}`;
        fs.unlink(path, (err) => {});
    }
}

router.post('/add-many', upload, async (req, res) => {

    var excelFiles = req.files;
    const { token, decentralise, headOfChemistry} = req.body;
    if(!decentralise || !headOfChemistry) return res.status(200).json({successes: false, reason:"Enter your full information"})

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    const path = `./uploads/files/${excelFiles[0].filename}`;
    var wb = xlsx.readFile(path, {cellDates: true})

    for(i = 0; i < wb.SheetNames.length; i++){
        var ws = wb.Sheets[wb.SheetNames[i]]
        var data = xlsx.utils.sheet_to_json(ws)

        for(j = 0; j < data.length; j++){

            var index = 0;
            const result = await indexS.findOne({'nameCollection': name_collection});
            if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
            else { index = result.index; }

            var md5Done = md5(String(data[j].MSSV))
            var sha256Done = sha256(md5Done)
            
            var user = new Users({
                "idNumber": index,
                "fullName": data[j].FullName,
                "code": data[j].MSSV,
                "userName": data[j].MSSV,
                "email": decentralise == "s" ? `${data[j].MSSV}@student.tdtu.edu.vn` : `${data[j].MSSV}@it.tdt.edu.vn`,
                "passWord": sha256Done,
                "decentralise": decentralise,
                "headOfChemistry": headOfChemistry,
            });
            await user.save(async (err, data) =>{
                if(err || !data) {
                    clear_Image(excelFiles);
                    return res.status(200).json({successes: false, reason: `Error in ${wb.SheetNames[i]} - item ${j}` })
                }
            });
            await tool_insert_index_collection.update_index_collection(name_collection, index);
        }
    }
    clear_Image(excelFiles);
    return res.status(200).json({successes:true})
});

cron.schedule('* * * * * *', async () => {
    await Tokens.find({"created_at":{$lt:parseInt(new Date()/1000 - 10800)}}).exec(async (err, data) => {
        if(data != ""){
            await Tokens.deleteMany({"created_at":{$lt:parseInt(new Date()/1000 - 10800)}}).exec((err,data) => { console.log(data) })
        }
    });
});

router.post('/login', async function(req, res){
    const {userName , passWord} = req.body
    if(userName && passWord && userName !== "" && passWord !== ""){
        await Users.findOne({"userName":userName,"passWord":sha256(passWord)}).exec(async function(err,data){
            if(err || !data) return res.status(200).json({"successes":false,"data":"User or password no valid"})
            
            var timestamp = parseInt(new Date()/1000)
            var token = sha256(config.key + userName + timestamp)
            
            var index = 0;
            const result = await indexS.findOne({'nameCollection': "token"});
            if(result == null){ tool_insert_index_collection.insert_index_collection("token", 1); index = 1; }
            else { index = result.index; }
            
            let tokenUser = new Tokens({
                "idNumber":index,
                "token":token,
                "userCode":data.code
            })
            
            await tokenUser.save(async (err, result) => { 
                // if(err || !result) return res.status(200).json({"successes":false,"reason":err})
                
                await tool_insert_index_collection.update_index_collection("token", index);
                return res.status(200).json({"successes":true,"data":token}) 
            })
        })
    }
});

router.post('/logout', async function(req, res){
    
    const { token } = req.body;
    
    await Tokens.findOne({"token":token}).exec(async function(err,data){
        if(err || !data) return res.json({"successes":false, reason: "Invalid token"})
        
        await Tokens.findOneAndRemove({"token":token})
        return res.json({"successes":true})
    })
});

// user-info
router.post("/user-info",async (req, res) =>{
    var token = req.body.token
    await Tokens.findOne({"token": token}).exec(async (err,data) => {
        
        if(err || !data) return res.status(200).json({"successes":false, reason: "user invalid"})
        
        var user = await Users.findOne({"code": data.userCode }, { _id:0, passWord:0, userName: 0, created_at:0, updated_at:0, __v:0 })
        
        if(user == "" || user == undefined || user == null) return res.status(200).json({"successes":false, data: "User is not defined"})
        return res.status(200).json({"successes": true, data: user})
    })
})

//find all user
router.post('/list-user', async (req, res) => {
    const {token} = req.body
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
    
    await Users.find({}, { _id:0, passWord:0, created_at:0, updated_at:0, __v:0 }).sort({"idNumber": -1}) // gia tri 0 tuong duong ko xuat field do ra ngoai
    .then(result => res.status(200).json({"successes": true, "data": result}))
    .catch((err) => res.status(200).json({"successes": false, "reason": err}));
});

//Add User by Admin
router.post('/add', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }
    
    const {token, fullName, code, decentralise, headOfChemistry } = req.body;
    
    if(!fullName || !code || !decentralise) return res.status(200).json({successes: false, reason:"Enter your full information"})
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})

    // var datatUserDetailByCode = await getUserDetailByCode(code)
    // if(datatUserDetailByCode != "" || datatUserDetailByCode != undefined || datatUserDetailByCode != null) return res.status(200).json({successes:false, "reason":"Code is used"})
    var md5Done = md5(code)
    var sha256Done = sha256(md5Done)
    const user = new Users({
        "idNumber": index,
        "fullName": fullName,
        "code": code,
        "userName": code,
        "email": decentralise == "s" ? `${code}@student.tdtu.edu.vn` : `${code}@it.tdt.edu.vn`,
        "passWord": sha256Done,
        "decentralise": decentralise,
        "headOfChemistry": headOfChemistry,
    });
    await user.save(async (err, data) =>{
        if(err || !data) return res.status(200).json({successes: false, reason: "Error." })
        
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({successes:true, data})
    }); 
});

// update passWord
router.post('/change-password', async (req, res) => {
    
    const { token, passWordOld, passWordNew } = req.body;
    var user = {"passWord": sha256(String(passWordNew))}
    
    if(!token || !passWordOld || !passWordNew) return res.status(200).json({successes: false, reason:"Enter your full information"})

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var dataUserDetail = await getUserDetail(checkUser.idNumber)
    if(!dataUserDetail) return res.status(200).json({successes:false, "reason":"User is not define"})
    
    if(checkUser.idNumber != dataUserDetail.idNumber){
        if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"User is not defined"})
    }
    if(checkUser.passWord != sha256(String(passWordOld)) || dataUserDetail.passWord != sha256(String(passWordOld))) return res.status(200).json({"successes":false,"reason":"Password is incorrect"})
    
    // Bat dau update
    let data = await Users.findOneAndUpdate({"idNumber":checkUser.idNumber}, user, {new: true})
    if(!data ) return res.status(200).json({successes: false, reason: "Change password is not successes" })
    return res.status(200).json({successes:true})
});

// Update user 
router.post('/update', async (req, res) => {
    
    const {token, idNumber, fullName, code, decentralise, headOfChemistry } = req.body;
    
    if(!idNumber || !fullName || !code || !decentralise || !headOfChemistry) return res.status(200).json({successes: false, reason:"Enter your full information"})

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})

    var dataUserDetail = await getUserDetail(idNumber)
    if(dataUserDetail == "" || dataUserDetail == undefined || dataUserDetail == null) return res.status(200).json({successes:false, "reason":"User is not define"})
    
    var user = {
        "fullName": fullName,
        "code": code, 
        "userName":code, 
        "email": decentralise === "s" ? `${code}@student.tdtu.edu.vn` : `${code}@it.tdt.edu.vn`,
        "decentralise": decentralise,
        "headOfChemistry": headOfChemistry,
    }
    // Kiem tra code đã dùng chưa
    if( dataUserDetail.code !== code){
        const codeDefined = await Users.findOne({"code": String(code)});
        if(codeDefined) return res.status(200).json({"successes":false, "reason":"Code is used"});
    } 

    // Bat dau update
    let data = await Users.findOneAndUpdate({"idNumber":idNumber}, user, {new: true})
    if(!data ) return res.status(200).json({successes: false, reason: "Update is not successes" })
    return res.status(200).json({successes:true, data})
});

// Delete user by id_number 
router.post('/delete', async (req, res) => {
    
    const { token, idNumber }= req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if(checkUser.decentralise != "a") return res.status(200).json({"successes":false,"reason":"You not have access"})
        
    var dataUserDetail = await getUserDetail(idNumber)
    if(dataUserDetail == "" || dataUserDetail == undefined || dataUserDetail == null) return res.status(200).json({successes:false, "reason":"User is not define"})
       
    await Users.findOneAndRemove( {"idNumber": idNumber}, async (err, data) =>{
        if(err || !data) return res.status(200).json({successes:false, reason: "Invalid user"})
        return res.status(200).json({successes: true, data})
    });
});

module.exports = router 