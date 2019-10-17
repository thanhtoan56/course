const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const name_collection = "banners";

require('../../../db/index');
const { Banners } = require('../../../db/models/banners/bannersSchema');
const indexS = require('../../../db/models/indexs/indexsSchema');

// require tool + function
const check = require('../functions/general');
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/banners'); },
    
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') { filetype = 'gif'; }
      
      if(file.mimetype === 'image/png') { filetype = 'png'; }
      
      if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
      
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

//Find All Banners
router.get('/list-banners', async(req, res) => {
    await Banners.find({},{ _id:0, __v: 0}).sort({"id_number": -1})
    .then(result => res.status(200).json({"successes": true, "data": result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

//Add Banner
router.post('/add-banner', upload.single('image_banner'), async (req, res) => {
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1;} 
    else { index = result.index; }

    const { token, name_banner, url, type} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    if (!name_banner || !url || !type) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    const banner = new Banners({
        "id_number": index,
        "name_banner": name_banner,
        "url": url,
        "type": type,
        "image_banner": req.file ? req.file.filename : "",
    });
    await banner.save(async (err, data) => {
        if(!data || err) return res.status(200).json({"success": false});
        
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true});
    });
});

// remove image before update banner
router.post('/remove-image',async (req,res) =>{
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"});
    
    await Banners.findOneAndUpdate({"id_number":id_number}, {"image_banner":""}).exec( (err,data) => {
        if (!data || err) return res.status(200).json({"successes":false,"reason":"Error!!"});
        
        const path = `./uploads/banners/${data.image_banner}`;
        fs.unlink(path, (err) => {});
        return res.status(200).json({"successes": true});
    });
});

// update banner
router.post('/update-banner', upload.single('image_banner'),async (req,res) =>{
    const {token, id_number, name_banner, url, type} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    
    var getBanner = await Banners.findOne({"id_number":id_number})
    if(getBanner == "" || getBanner == undefined || getBanner == null) return res.status(200).json({"successes":false,"reason":"Banner invalid"})
    if( !name_banner || !url || !type ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var banner = {
        "name_banner": name_banner,
        "url": url,
        "type": type,
        "image_banner": req.file ? req.file.filename : getBanner.image_banner,
    };
    await Banners.findOneAndUpdate({"id_number":id_number}, banner, {new: true}).exec(function(err,data){
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    });
});

// remove banner
router.post('/remove-banner',async (req,res) =>{
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if ( user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    
    await Banners.findOneAndRemove({"id_number":id_number}).exec(function(err,data){
        if ( err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})

        const path = `./uploads/banners/${data.image_banner}`
        fs.unlink(path, (err) => {})
        return res.status(200).json({"successes":true})
    });
});

module.exports = router