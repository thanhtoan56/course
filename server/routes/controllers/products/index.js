const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const _ = require('lodash');

const name_collection = "product";

require('../../../db/index');
const Users = require('../../../db/models/users/userSchema');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Orders } = require('../../../db/models/orders/ordersSchema');
const { Products } = require('../../../db/models/products/productSchema');

const check = require('../functions/general');
const { cleanAccents } = require('../functions/format_link');
const tool_insert_index_collection = require('../functions/insert_index_collection');
const { validatorNameProduct, getLengthProduct, getLengthProductOfUser, getProductDetail, getLengthProductIndex } = require('../tools/index')

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/products'); },
    
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') { filetype = 'gif'; }
      
      if(file.mimetype === 'image/png') { filetype = 'png'; }
      
      if(file.mimetype === 'image/jpeg') { filetype = 'jpg'; }
      
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});  
// List top sale
router.post('/list-top-sale', async (req, res) => {
    
    const { link }  = req.params;
    var { offset } = req.body;

    var shop = await Users.findOne({"link": link}, {_id:0, password:0, created_at:0, updated_at:0, __v:0, auth_admin:0, auth_email:0 })
    const count = await getLengthProductOfUser(shop.id_number);
    
    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 20 }

    await Products.find({"user_id": shop.id_number}).limit(20).skip(Number(x)).exec(async function(err,data){
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not defined"})
        return res.status(200).json({"successes": true, "data": data, "shop": shop, length: count.length})
    });
});
 
router.post('/list-product-shop/:link', async (req, res) => {
    
    const { link }  = req.params;
    var { offset } = req.body;

    var shop = await Users.findOne({"link": link}, {_id:0, password:0, created_at:0, updated_at:0, __v:0, auth_admin:0, auth_email:0 })
    const count = await Products.find({"user_id":shop.id_number, "total_quantity": {$gt: 0}});
    
    var x = 0
    if(Number(offset) === 1) { x = 0 }
    else { x = (offset - 1) * 20 }

    await Products.find({"user_id":shop.id_number, "total_quantity": {$gt: 0}}).limit(20).skip(Number(x)).exec(async function(err,data){
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not defined"}) 
        return res.status(200).json({"successes": true, "data": data, "shop": shop, length: count.length}) 
    });
});

// List product of user by user_id 
router.post('/list-product-user/:id', async (req, res) => {
    const { user_id } = req.body;
    const count = await getLengthProductOfUser(user_id);

    var offset = req.params.id
    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 20 }

    await Products.find({"user_id":user_id}).sort({"id_number": -1}).limit(20).skip(Number(x)).exec(async function(err,data){
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not defined"})
        return res.status(200).json({"successes": true, "data": data, length: count.length})
    });
});

//find all products
router.get('/list-page-product/:id', async (req, res) => {
    const count = await getLengthProduct();

    var offset = req.params.id
    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 20 }
    
    await Products.find({}).sort({"id_number": -1}).limit(20).skip(Number(x)).exec(async function(err,data){
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not defined"})
        return res.status(200).json({"successes": true, "data": data, length: count.length})
    });
});

// ***Search products by erverything
router.get('/search/:name', async(req, res) =>{
    const { name } = req.params;
    var clearLink = cleanAccents(name);
    
    await Products.find({"link": {$regex: clearLink}, "total_quantity": {$gt: 0}}, {"id_categories": 0, "description": 0, "brand": 0, "type": 0, "color": 0, "tags": 0, "sku": 0, 
    "detail": 0, "made": 0, "showIndex": 0, "size": 0, "material": 0, "capacity": 0, "add_info": 0, "sex": 0, "created_at": 0, "updated_at": 0, "user_id":0, "specifications":0}).exec(async(err, data) => {
        if(err || !data) return res.status(200).json({"successes": false, "reason": "Not defined"})
        
        const count = data.length;
        return res.status(200).json({"successes": true, count, "data": data})
    });
});

// ***find all products
router.get('/list-product', async (req, res) => {
    await Products.aggregate([
        { $lookup: {from: "categories", localField: "id_categories", foreignField: "id_number", as: "infoProduct"} },
        { $unwind: "$infoProduct"},
        { $project: {_id:"$_id: 0",id_number: "$id_number",name_product:"$name_product",sku:"$sku", link:"$link", description: "$description", brand: "$brand", type: "$type", color: "$color", price_origin: "$price_origin", price_promotion: "$price_promotion", tags: "$tags", detail: "$detail", image_main: "$image_main", total_quantity: "$total_quantity", specifications: "$specifications", name_category:"$infoProduct.name_category"}},
        ]).exec(function(err,data){
            if(err || !data) return res.status(200).json({"successes": false, "reason": err})
            return res.status(200).json({"successes": true, "data": data})
        }
    );
});

//add product
router.post('/add-product', upload.single('image_main'), async (req, res) => {
    var index = 0; 
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1;}
    else { index = result.index; }
    
    const { token, name_product, link, id_categories, description, brand, type, color, price_origin, price_promotion, tags, sku, detail, made, showIndex, freeShip, total_quantity, specifications } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if (!name_product || !link || !id_categories || !description || !brand || !price_origin || !tags || !sku || !made) return res.status(200).json({"successes": false, "reason":" Enter your full information"});
    var product = new Products({
        "id_number": index,
        "name_product": name_product,
        "link": link,
        "id_categories": id_categories,
        "description": description,
        "brand": brand,
        "type": type,
        "color": color,
        "price_origin": price_origin,
        "price_promotion": price_promotion,
        "image_main": req.file ? req.file.filename : "",
        "user_id": checkUser.id_number,
        "tags": tags,
        "sku": sku, 
        "detail": detail, 
        "made": made,
        "showIndex": showIndex,
        "freeShip": freeShip,
        "total_quantity": total_quantity,
        "specifications": specifications,
        "created_at":parseInt(new Date() / 1000)
    });
    const name = cleanAccents(name_product);
    if(name != link) return res.status(200).json({"successes":false, "reason":"Link Error"});
    const linkDefind = await Products.findOne({"link": link});
    if(linkDefind != "" && linkDefind  != undefined && linkDefind != null) return res.status(200).json({"successes":false, "reason":"Link is used"});
    
    if(price_promotion != 0 && price_promotion != "" && price_promotion != null && price_promotion != undefined){
        if(Number(price_promotion) > Number(price_origin)) return res.status(200).json({"successes":false, "reason":"Promotion must be less than origin"});
        
        await product.save(async (err, data) => {
            if(err || !data) return res.status(200).json({"successes": false, "reason": "Error!!"});
            
            tool_insert_index_collection.update_index_collection(name_collection, index);
            return res.status(200).json({"successes": true});
        });
    } else {
        await product.save(async (err, data) => {
            if(err || !data) return res.status(200).json({"successes": false, "reason": "Error!!"});
            
            tool_insert_index_collection.update_index_collection(name_collection, index);
            return res.status(200).json({"successes": true});
        });
    } 
});

// remove image before update product
router.post('/remove-image',async (req,res) =>{
    const { token, id_number } = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var getProduct = await getProductDetail(id_number);
    if(getProduct == "" || getProduct == null || getProduct == undefined) return res.status(200).json({successes: false, reason:"Product is not defined"})
    
    if ((checkUser.id_number === getProduct.user_id) || (checkUser.auth_admin === "Y")) {
        await Products.findOneAndUpdate({"id_number": id_number}, {"image_main":""}).exec(function(err,data){
            if (!data || err) return res.status(200).json({"successes":false,"reason":"Error!!"});
   
            const path = `./uploads/products/${data.image_main}`;
            fs.unlink(path, (err) => {});
            return res.status(200).json({"successes":true});
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not define"});
});

// update product
router.post('/update-product', upload.single('image_main'), async (req, res) => {
    const { token, id_number, name_product, link, id_categories, description, brand, price_origin, price_promotion, tags, sku, detail, showIndex, freeShip, total_quantity, specifications } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var getProduct = await getProductDetail(id_number);
    if(getProduct == "" || getProduct == null || getProduct == undefined) return res.status(200).json({successes: false, reason:"Product is not defined"})
    
    if ((checkUser.id_number === getProduct.user_id) || (checkUser.auth_admin === "Y")) {
        if(!name_product || !link || !id_categories || !description || !brand || !price_origin || !tags) return res.status(200).json({successes: false, reason:"Enter your full information"})
        var product = {
            "name_product": name_product, 
            "link": link, 
            "id_categories": id_categories, 
            "description": description, 
            "brand": brand, 
            "price_origin": price_origin, 
            "price_promotion":price_promotion,
            "image_main": req.file ? req.file.filename : getProduct.image_main, 
            "tags": tags, 
            "sku": sku,
            "detail": detail,
            "showIndex": showIndex,
            "freeShip": freeShip,
            "total_quantity": total_quantity,
            "specifications": specifications 
        };
        if(getProduct.name_product === name_product){
            if(price_promotion && price_promotion != null && price_promotion != undefined && price_promotion != ""){
                if(Number(price_promotion) > Number(price_origin)) return res.status(200).json({"successes":false, "reason":"Promotion must be less than origin"});
                await Products.findOneAndUpdate({"id_number":id_number}, product, {new: true}, async (err, data) =>{
                    if (!data || err) return res.status(200).json({"successes":false,"reason":"Error!!"});   
                    return res.status(200).json({successes:true, data});
                }); 
            } else {
                await Products.findOneAndUpdate({"id_number":id_number}, product, {new: true}, async (err, data) =>{
                    if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"});   
                    return res.status(200).json({successes:true, data})
                }); 
            }
        } else {
            const name = cleanAccents(name_product);
            if(name != link) return res.status(200).json({"successes":false, "reason":"Link Error"});
            const linkDefind = await Products.findOne({"link": link});
            if(!_.isEmpty(linkDefind)) return res.status(200).json({"successes":false, "reason":"Link is used"});
            Promise.all([validatorNameProduct(name_product)])
            .then(async data =>{
                if(data) {
                    if(price_promotion && price_promotion != "" && price_promotion != "null"){
                        if(Number(price_promotion) > Number(price_origin)) return res.status(200).json({"successes":false, "reason":"Promotion must be less than origin"});
                        await Products.findOneAndUpdate({"id_number":id_number}, product, {new: true}, async (err, data) =>{
                            if (!data || err) return res.status(200).json({"successes":false,"reason":"Error!!"});   
                            return res.status(200).json({successes:true, data})
                        });  
                    } else {
                        await Products.findOneAndUpdate({"id_number":id_number}, product, {new: true}, async (err, data) =>{
                            if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"});   
                            return res.status(200).json({successes:true, data})
                        }); 
                    }
                } else return res.status(200).json({"successes":false, "reason":"Validator"});
            }).catch(err => res.status(200).json({successes: false, reason: err}))
        }
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
});

// Delete product
router.post('/remove-product', async (req, res) => {

    const { token, id_number } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var getProduct = await getProductDetail(id_number);
    if(getProduct == "" || getProduct == null || getProduct == undefined) return res.status(200).json({"successes":false,"reason":"Product is not define"})
    
    if ((checkUser.id_number === getProduct.user_id) || (checkUser.auth_admin === "Y")) {

        // Tìm sp trong list order cua shop, loc ra nhung order nao trong vong 24h thì ko cho xoa sp
        const list_order = await Orders.find({"user_id": checkUser.id_number, "seller_confirm": false, "cancelled": false, "completed": false, "created_timestamp":{$gt:parseInt(new Date / 1000) - 10800}})
        for(let i = 0; i < list_order.length; i++){
            const list_product = JSON.parse(list_order[i].list_product)

            const test = list_product.some( obj => { return obj.id == id_number })
            if(test == true) return res.status(200).json({successes: false, "reason": "Product is in payment"})
        }
        await Products.findOneAndRemove( {"id_number": id_number}, async (err, data) =>{
            if (!data || err)  return res.status(200).json({"successes":false,"reason":"Error!!"}); 
            
            const path = `./uploads/products/${data.image_main}`;
            fs.unlink(path, (err) => {});
            return res.status(200).json({successes:true, data})
        }); 
    } else return res.status(200).json({"successes":false,"reason":"User is not define"})
});

router.get('/:id', async (req, res) => {
    const name = req.params.id;

    if(!name || name == "") return res.status(200).json({"successes":false,"reason":"invalid"});
    const product = await Products.findOne({"link":name},{_id:0})
    if(product == "" || product == undefined || product == null) return res.status(200).json({"successes":false,"reason":"Product is not define"});
    
    await Products.aggregate([
    {$match:{'id_number':product.id_number} },
    { $lookup: {from: "images", localField: "id_number", foreignField: "id_product", as: "infoImages"} },
    // { $unwind: "$infoImages"},
    // { $project: {_id:"$_id: 0",id_number: "$id_number",name_product:"$name_product",sku:"$sku", link:"$link", description: "$description", brand: "$brand", type: "$type", color: "$color", price_origin: "$price_origin", price_promotion: "$price_promotion", tags: "$tags", detail: "$detail", image_main: "$image_main", name_category:"$infoProduct.name_category"}},
    ])
    .exec((err,data) => {
        if(err || !data) return res.status(200).json({"successes":true, "data":data});
        return res.status(200).json({"successes":true, "data":data});
    })
});

// Load Product by field "showIndex"
router.get('/list/show-index', async (req, res) => {
    await Products.find({"showIndex": true, "total_quantity": {$gt: 0}},{"detail":0}).sort({"id_number": 1}).exec( (err, data) => {
        if(err || !data) return res.status(200).json({"successes":false,"reason":"Error or Not found"})
        return res.status(200).json({"successes":true, "data":data});
    });
});

router.get('/list/show-index/:id', async (req, res) => {
    const count = await Products.find({"showIndex": true, "total_quantity": {$gt: 0}});
    var offset = req.params.id
    
    if (isNaN(Number(offset))) return res.status(200).json({"successes":false, "reason":"Not found"})
    
    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 20 }
    
    await Products.find({"showIndex": true, "total_quantity": {$gt: 0}}).limit(20).skip(Number(x)).exec(async function(err,data){
        if(err || !data) return res.status(200).json({"successes":false,"reason":"Error or Not found"})
        return res.status(200).json({"successes":true, "data":data,"count":count.length})
    });
});

module.exports = router
