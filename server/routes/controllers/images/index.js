const express = require('express');
const router = express.Router();
const fs = require('fs')
const bodyParser = require('body-parser');

require('../../../db/index');
const check = require('../functions/general');
const { Images } = require('../../../db/models/images/imagesSchema');
const { Products } = require('../../../db/models/products/productSchema');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/images/products'); },
    
    filename: (async (req, file, cb) => {
        var filetype = '';
        if(file.mimetype === 'image/gif') { filetype = 'gif'; }
        
        if(file.mimetype === 'image/png') { filetype = 'png'; }
        
        if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
        
        cb(null, 'image-' + Date.now() + '.' + filetype);
    })
});

var upload =  multer({storage: storage}).array('files', 6);

router.post('/add-images', upload, async (req, res) => {
    var checkSave = []
    var token = req.body.token
    var link = req.body.id_product
    var images = req.files;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes){
        clear_Image(images);
        return res.json({"successes":false, reason: checkToken.reason})
    }
    const user = checkToken.data;
    var getProduct = await Products.findOne({"link": link});
    if(images.length > 6) { 
        clear_Image(images);
        return res.status(200).json({"successes":false,"reason":"Qua lon"})
    }
    for(i = 0; i < images.length; i++){
        const image = new Images({
            "filename":images[i].filename,
            "size":images[i].size,
            "type": "product",
            "id_product": getProduct.id_number
        });
        await image.save(async (err, data) => {
            if(data) { checkSave.push(data) }
        });
    }
    if(checkSave !== "") return res.status(200).json({"successes": true});
    else {  
        clear_Image(images);
        return res.status(200).json({"successes": false,"reason":"Err!"});
    }
});

function clear_Image(images){
    for(i = 0; i < images.length; i++){
        const path = `./uploads/images/products/${images[i].filename}`;
        fs.unlink(path, (err) => {});
    }
}

// Delete One image-many
router.post('/remove-image-product', async (req, res) => {
    
    var { token, id_product, _id }= req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    const getProduct = await Products.findOne({"id_number":id_product});
    if ((user.id_number === getProduct.user_id) || (user.auth_admin === "Y")) {
        const image = await Images.findOne({"_id": _id})
        const path = `./uploads/images/products/${image.filename}`;
        fs.unlink(path, (err) => {});
        await Images.findOneAndRemove({"_id": _id}).exec((err, data) => {
            if(err || !data)  return res.status(200).json({"successes":false,"reason":"Erro"})
            return res.status(200).json({"successes":true})
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not define"})
});

module.exports = router

