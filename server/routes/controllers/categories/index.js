const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

const name_collection = "categories";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Products } = require('../../../db/models/products/productSchema');
const { Categories } = require('../../../db/models/categories/categoriesSchema');

const check = require('../functions/general')
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/categories'); },
    
    filename: (req, file, cb) => {
        var filetype = '';
        if(file.mimetype === 'image/gif') { filetype = 'gif'; }
      
        if(file.mimetype === 'image/png') { filetype = 'png'; }
      
        if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
      
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

//find all categories
router.get('/list-categories', async (req, res) => {
    await Categories.find({},{ _id:0}).sort({"id_number": -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

//add category
router.post('/add-categories',upload.single('file'), async (req, res) => {
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, parent_id, name_category, link, description, tags} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    if(!tags || !name_category || !link) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    const category = new Categories({
        "id_number": index,
        "parent_id": parent_id,
        "name_category": name_category,
        "link": link,
        "description": description,
        "image": req.file ? req.file.filename : "",
        "tags": tags,
    });
    await category.save(async (err, data) => {
        if(err || !data) return res.status(200).json({"success":false, "reason": "Error!!"})

        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"success":true})
    });
});

// update categories
router.post('/update-categories',upload.single('file'),async (req,res) =>{
    const {token, id_number, name_category, link, description, tags} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    var getCategory = await Categories.findOne({"id_number":id_number});
    if( !name_category || !link || !tags ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var category = {
        "parent_id": 0,
        "name_category": name_category,
        "link": link,
        "image":req.file !== undefined ? req.file.filename : getCategory.image || "",
        "description": description,
        "tags": tags,
    };
    await Categories.findOneAndUpdate({"id_number":id_number}, category, {new: true}).exec( (err,data) => {
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"})
        return res.status(200).json({"successes":true})
    }); 
});

// remove categories
router.post('/remove-categories',async (req,res) =>{
    
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    
    await Categories.findOneAndRemove({"id_number":id_number}).exec( (err,data) => {
        if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"})   
        
        const path = `./uploads/categories/${data.image}`
        fs.unlink(path, (err) => {})
        return res.status(200).json({"successes":true})
    });
});

// remove image before update categories
router.post('/remove-image',async (req,res) =>{
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if (user.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"});
    
    await Categories.findOneAndUpdate({"id_number":id_number}, {"image":""}).exec(function(err,data){
        if (err || !data)  return res.status(200).json({"successes":false,"reason":"Error!!"});
        
        const path = `./uploads/categories/${data.image}`;
        fs.unlink(path, (err) => {});
        return res.status(200).json({"successes":true});
    }); 
});

// Get Product by Categories
router.get('/by-categories/:name', async (req, res) => {
    const name  = req.params.name;

    const category = await Categories.findOne({"link": name});

    if( !category)  return res.status(200).json({"successes":false,"reason":"Category is not define!!"});
    
    await Products.find({"id_categories": category.id_number}).exec( (err, data) => {
        if (err || !data )  return res.status(200).json({"successes":false,"reason":"Error!!"});
        return res.status(200).json({"successes":true, "data": data,"name_category":category.name_category });
    });
});

router.get('/by-categories/:name/:id', async (req, res) => {
    
    var offset = req.params.id

    const category = await Categories.findOne({"link": req.params.name});
    
    if( !category)  return res.status(200).json({"successes":false,"reason":"Category is not define!!"});
    
    const count = await Products.find({"id_categories": category.id_number, "total_quantity": {$gt: 0}});
    
    if (isNaN(Number(offset))) return res.status(200).json({"successes":false, "reason":"Not found"})
    
    // var x = 0
    // if(Number(offset) === 1){ x = 0 }
    // else { x = (offset - 1) * 20 }

    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 5 }
    
    await Products.find({"id_categories": category.id_number, "total_quantity": {$gt: 0}}).limit(5).skip(Number(x)).exec( (err, data) => {
        if(err || !data) return res.status(200).json({"successes":false,"reason":"Error or Not found"})
        return res.status(200).json({"successes":true, "data":data,"count":count.length, "name_category":category.name_category})
    });
});

module.exports = router