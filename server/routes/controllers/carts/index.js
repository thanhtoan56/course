const express = require('express');
const bodyParser = require('body-parser');
const sha256 = require('sha256');

const router = express.Router();
const name_collection = "carts";

require('../../../db/index');
const { keyCart } = require("../../../config/app")
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Carts } = require('../../../db/models/carts/cartsSchema');
const { Products } = require('../../../db/models/products/productSchema');

// require tool + function
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get 
router.get('/list-cart', async (req, res) => {
    await Carts.find({})
    .then(data => res.status(200).json({"successes": true, "data": data}))
    .catch(err => res.status(200).json({"successes": false, "reason": err.message}))
});

// Get cart for user
// router.post('/get-cart', async (req,res) => {
//     const { appId } = req.body;
//     await Carts.aggregate([
//         {$match: {"appId": appId}},
//         { $lookup: {from: "products", localField: "idProduct", foreignField: "id_number", as: "infoProduct"} },
//         { $unwind: "$infoProduct"},
//         { $project: {_id:"$_id: 0", id_number: "$idProduct", quantity: "$quantity" ,name_product:"$infoProduct.name_product", link:"$infoProduct.link", price_origin: "$infoProduct.price_origin", price_promotion: "$infoProduct.price_promotion", image_main: "$infoProduct.image_main", total_quantity: "$infoProduct.total_quantity"}},
//     ])
//     .exec(async (err, data) => {
//         if(err || !data) return res.status(200).json({"successes": false, "reason": "err"})
//         return res.status(200).json({"successes":true, "listCart": data});
//     });
// });

//Add Carts
router.post('/add-cart', async (req, res) => {
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; } 
    else { index = result.index; }

    const { idProduct, quantity, appId } = req.body;
    if (!idProduct || !quantity) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var product = await Products.findOne({"id_number": idProduct})
    if (!product) return res.status(200).json({"successes":false,"reason":"Product is not defined"})
    if (product.total_quantity - quantity < 0) return res.status(200).json({"successes":false,"reason":"Quantity is larger than the quantity in warehouse"})
    
    var appIdCart = ""
    if(appId == "") {
        const cart = new Carts({
            "appId": sha256(index + keyCart),
            "idProduct": idProduct,
            "quantity": quantity,
            "createdCart": parseInt(new Date() / 1000),
            "created_at": parseInt(new Date() / 1000)
        });
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        appIdCart = await cart.save()
    } else {
        const cartOld = await Carts.find({"appId": appId})
        if(cartOld == null || cartOld == undefined || cartOld == "") return res.status(200).json({"successes":false , "reason":"Cart is not defined"});
        
        var idTempCart = ""
        
        for(let i = 0; i < cartOld.length; i ++){
            if(cartOld[i].idProduct == idProduct) { idTempCart = cartOld[i]._id }
        }

        if(idTempCart != "") { appIdCart = await Carts.findOneAndUpdate({"_id": idTempCart}, {"quantity": quantity }, {new: true}) } 
        else { 
            const cart = new Carts({ "appId": cartOld[0].appId, "idProduct": idProduct, "quantity": quantity, "createdCart": cartOld[0].createdCart, "created_at": parseInt(new Date() / 1000) });
            appIdCart = await cart.save() 
        }
    }
    await Carts.aggregate([
        {$match: {"appId": appIdCart.appId}},
        { $lookup: {from: "products", localField: "idProduct", foreignField: "id_number", as: "infoProduct"} },
        { $unwind: "$infoProduct"},
        { $project: {_id:"$_id: 0", id_number: "$idProduct", quantity: "$quantity" ,name_product:"$infoProduct.name_product", link:"$infoProduct.link", price_origin: "$infoProduct.price_origin", price_promotion: "$infoProduct.price_promotion", image_main: "$infoProduct.image_main", total_quantity: "$infoProduct.total_quantity"}},
    ])
    .exec(async (err, data) => {
        if(err || !data) return res.status(200).json({"successes": false, "reason": "err"})
        return res.status(200).json({"successes":true , "appId": appIdCart.appId, "listCart": data});
    });
});

// Update Carts
router.post('/update-cart',async (req,res) =>{
    const { carts, appId } = req.body;
    
    if( carts == "" || appId == "" ) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    var getCart = await Carts.find({"appId": appId})
    if(getCart == null || getCart == "" || getCart == undefined) return res.status(200).json({"successes":false,"reason":"Cart is not defined"})
    if(getCart.length != carts.length) return res.status(200).json({"successes":false,"reason":`Error ! Cart is not defined`})
    for(let i = 0; i < carts.length; i++){
        
        var product = await Products.findOne({"id_number": carts[i].idProduct})
        if (!product) return res.status(200).json({"successes":false,"reason":`Product is not defined`})
        if (product.total_quantity - carts[i].quantity < 0) return res.status(200).json({"successes":false,"reason":"The update failed. Quantity is larger than the quantity in warehouse"})
        
        await Carts.findOneAndUpdate({"appId":appId, "idProduct": carts[i].idProduct}, {"quantity": carts[i].quantity }, {new: true})
    }
    await Carts.aggregate([
        {$match: {"appId": appId}},
        { $lookup: {from: "products", localField: "idProduct", foreignField: "id_number", as: "infoProduct"} },
        { $unwind: "$infoProduct"},
        { $project: {_id:"$_id: 0", id_number: "$idProduct", quantity: "$quantity" ,name_product:"$infoProduct.name_product", link:"$infoProduct.link", price_origin: "$infoProduct.price_origin", price_promotion: "$infoProduct.price_promotion", image_main: "$infoProduct.image_main", total_quantity: "$infoProduct.total_quantity"}},
    ])
    .exec(async (err, data) => {
        if(err || !data) return res.status(200).json({"successes": false, "reason": "err"})
        return res.status(200).json({"successes":true, "listCart": data});
    });
});

// Remove Carts
router.post('/remove-cart',async (req,res) =>{
    const { appId } = req.body;
    if(!appId) return res.status(200).json({"successes":false,"reason":"Can not delete!"})
    if(!req.body.idProduct){
        await Carts.deleteMany({"appId":appId}).exec(function(err,data){
            if (!data || err) return res.status(200).json({"successes":false,"reason":"Error!!"})   
            return res.status(200).json({"successes":true})
        });
    } else {
        await Carts.findOneAndRemove({"appId":appId, "idProduct":req.body.idProduct})
        await Carts.aggregate([
            {$match: {"appId": appId}},
            { $lookup: {from: "products", localField: "idProduct", foreignField: "id_number", as: "infoProduct"} },
            { $unwind: "$infoProduct"},
            { $project: {_id:"$_id: 0", id_number: "$idProduct", quantity: "$quantity" ,name_product:"$infoProduct.name_product", link:"$infoProduct.link", price_origin: "$infoProduct.price_origin", price_promotion: "$infoProduct.price_promotion", image_main: "$infoProduct.image_main", total_quantity: "$infoProduct.total_quantity"}},
        ])
        .exec(async (err, data) => {
            if(err || !data) return res.status(200).json({"successes": false, "reason": "err"})
            return res.status(200).json({"successes":true, "listCart": data});
        });
    }
});

router.get('/best-saler', async(req, res) => {
    const getAllProducts = await Carts.find({});
})

async function getAll() {
    const get = await Carts.distinct("id_product")
    get.forEach(async product => {
        const best = await Carts.find({"id_product": product})
        var total = 0;
        best.forEach(async best => {
            total += best.quantity; 
        })
    })
} 

getAll();
module.exports = router