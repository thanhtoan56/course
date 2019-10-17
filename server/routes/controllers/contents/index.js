const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const name_collection = "contents";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Contents } = require('../../../db/models/contents/contentsSchema');

// require tool + function
const check = require('../functions/general');
const { getContentDetail } = require('../tools/index')
const { cleanAccents } = require('../functions/format_link');
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/contents'); },
    
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') { filetype = 'gif'; }
      
      if(file.mimetype === 'image/png') { filetype = 'png'; }
      
      if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
      
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// Get params.id for generate nuxt.js/////////////
router.get('/', async (req, res) => {
    await Contents.find({},{ _id:0})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});
//Find All Contents
router.get('/list-contents', async (req, res) => {
    await Contents.find({},{ _id:0, __v: 0}).sort({"id_number": -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

//Add Content
router.post('/add-content', upload.single('image_content'), async (req, res) => {

    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null) { tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; } 
    else { index = result.index; }

    const { token, name_content, des_content, detail_content, link, cate, tags } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    if (!name_content || !des_content || !detail_content || !link) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var name = cleanAccents(name_content);
    if(name !== link) return res.status(200).json({"successes":false, "reason":"Link Error"});
    
    const linkDefind = await Contents.findOne({"link": link});
    if(linkDefind != "" || linkDefind != undefined || linkDefind != null) return res.status(200).json({"successes":false, "reason":"Link is used"});
    
    const content = new Contents({
        "id_number": index,
        "name_content": name_content,
        "des_content": des_content,
        "detail_content":detail_content,
        "link":link,
        "cate": cate,
        "tags": tags,
        "image_content": req.file ? req.file.filename : "",
    });
    await content.save(async (err, data) =>{
        if(err || !data) return res.status(200).json({"successes": false});
        
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true});
    });
});

// remove image before update Content
router.post('/remove-image',async (req,res) =>{
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y")  return res.status(200).json({"successes":false,"reason":"Auth pemission"});
    
    await Contents.findOneAndUpdate({"id_number":id_number}, {"image_content":""}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"});
        
        const path = `./uploads/contents/${data.image_content}`;
        fs.unlink(path, (err) => {});
        return res.status(200).json({"successes":true});
    });
});

// update Content
router.post('/update-content', upload.single('image_content'),async (req,res) =>{
    const {token, id_number, name_content, des_content, detail_content, link, cate, tags} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"User is not defined"})
    
    if(!name_content || !des_content || !detail_content || !link) return res.status(200).json({successes: false, reason:"Enter your full information"})
    var getContent = await getContentDetail(id_number)
    if(getContent == "" || getContent == null || getContent == undefined) return res.status(200).json({successes: false, reason:"Content is not defined"})
    
    var content = {
        "name_content": name_content, 
        "des_content": des_content, 
        "detail_content": detail_content, 
        "link": link,
        "cate": cate, 
        "tags": tags,
        "image_content": req.file ? req.file.filename : getContent.image_content || "",
    };
    if(getContent.name_content === name_content){
        await Contents.findOneAndUpdate({"id_number":id_number}, content, {new: true}, async (err, data) =>{
            if ( err || !data) return res.status(200).json({"successes":false, "reason":"Error!!"});   
            return res.status(200).json({successes:true, data})
        }); 
    } 
    else {
        const name = cleanAccents(name_content);
        if(name != link) return res.status(200).json({"successes":false, "reason":"Link Error"});
        
        const linkDefind = await Contents.findOne({"link": link});
        if(linkDefind != "" || linkDefind != undefined || linkDefind != null) return res.status(200).json({"successes":false, "reason":"Link is used"});
        await Contents.findOneAndUpdate({"id_number":id_number}, content, {new: true}, async (err, data) =>{
            if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"});   
            return res.status(200).json({successes:true, data})
        }); 
    }
});

// remove Content
router.post('/remove-content', async(req,res) =>{
    
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"}) 
    await Contents.findOneAndRemove({"id_number":id_number}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        
        const path = `./uploads/contents/${data.image_content}`
        fs.unlink(path, (err) => {})
        return res.status(200).json({"successes":true})
    }); 
});

router.get('/:name', async (req, res) => {
    const name = req.params.name;
    if(!name || name == "") return res.status(200).json({"successes": false,"reason": "Invalid"})
    
    await Contents.findOne({"link":name},{_id:0}).exec( (err,data) => {
        if(err || !data) return res.status(200).json({"successes":false,"reason":"Error or Data"})
        return res.status(200).json({ "successes":true, "data":data })
    });
});

module.exports = router