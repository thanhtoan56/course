const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const name_collection = "advertisements";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Advertisements } = require('../../../db/models/advertisements/advertisementsSchema');

// require tool + function
const check = require('../functions/general');
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/advertisements'); },
    
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') { filetype = 'gif'; }
      
      if(file.mimetype === 'image/png') { filetype = 'png'; }
      
      if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
      
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// Get Advertisiment
router.get('/list-advertisement', async (req, res) => {
    await Advertisements.find({},{ _id:0}).sort({"id_number": -1}).exec( async (err, data) => {
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not found list advertisements."})
        return res.status(200).json({"successes": true, "data": data})
    })
});

//add Advertisiment
router.post('/add-advertisement', upload.single('file'), async (req, res) => {
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null) { tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, name, link, posision} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    if(!name || !link || !posision) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    const advertisement = new Advertisements({
        "id_number": index,
        "name_advertisement": name,
        "link": link,
        "posision": Number(posision),
        "image_advertisement": req.file ? req.file.filename : "",
    });
    await advertisement.save(async (err,data) => {
        if(!data || err) return res.status(200).json({"success":false, "reason": "Error!!"})
    
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"success":true})
    });
});

// remove image before update Advertisiment
router.post('/remove-image',async (req,res) =>{
    const {token, id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"});
    
    await Advertisements.findOneAndUpdate({"id_number":id_number}, {"image_advertisement":""}).exec((err, data) =>{
        if ( err || !data )  return res.status(200).json({"successes":false,"reason":"Error!!"});
        
        const path = `./uploads/advertisements/${data.image_advertisement}`;
        fs.unlink(path, (err) => {});
        return res.status(200).json({"successes":true});
    });
});
// update Advertisiment
router.post('/update-advertisement',upload.single('file'),async (req,res) =>{
    const {token, id_number, name, link, posision} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    
    var getAdvertisement = await Advertisements.findOne({"id_number":id_number});
    if( !name || !link ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    var advertisement = {
        "name_advertisement": name,
        "link": link,
        "posision": Number(posision),
        "image_advertisement": req.file !== undefined ? req.file.filename : getAdvertisement.image_advertisement || "",
    };
    await Advertisements.findOneAndUpdate({"id_number":id_number}, advertisement, {new: true}).exec((err,data) =>{
        if (err ||!data) return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes": true})
    });
});

// remove Advertisiment
router.post('/remove-advertisement',async (req,res) =>{
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"}) 
    await Advertisements.findOneAndRemove({"id_number":id_number}).exec((err, data) =>{
        if (err || !data) return res.status(200).json({"successes":false,"reason":"Error!!"})

        const path = `./uploads/advertisements/${data.image_advertisement}`
        fs.unlink(path, (err) => {})
        return res.status(200).json({"successes":true})
    });
});

module.exports = router