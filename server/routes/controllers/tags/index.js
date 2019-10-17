const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const name_collection = "tags";

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

require('../../../db/index');
const { Tags } = require('../../../db/models/tags/tagsSchema');
const indexS = require('../../../db/models/indexs/indexsSchema');

// require tool + function
const check = require('../functions/general');
const tool_insert_index_collection = require('../functions/insert_index_collection');

//Find All Tags
router.get('/list-tags', async(req, res) => {
    await Tags.find({},{ _id:0, __v: 0}).sort({"id_number": -1})
    .then(result => res.status(200).json({"successes":true,"data":result}))
    .catch((err) => res.status(200).json({"successes":false,"reason":err}));
});

//Add Tag
router.post('/add-tag', async (req, res) => {

    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; } 
    else { index = result.index; }

    var { token, name_tag, link } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if (checkUser.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    if (!name_tag || !link) return res.status(200).json({"successes":false,"reason":"Enter your full information"})
    
    const tag = new Tags({ "id_number": index, "name_tag": name_tag, "link": link });
    await tag.save(async (err, data) =>{
        if(!data || err) return res.status(200).json({"successes": false, "reason": "Error or Not found"});
        
        await tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"successes":true});
    });
});

// update Tag
router.post('/update-tag',async (req,res) =>{
    const {token, id_number, name_tag, link} = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if ((checkUser.auth_admin !== "Y")) return res.status(200).json({"successes":false,"reason":"User is not defined"});
    if(!name_tag || !link) return res.status(200).json({successes: false, reason:"Enter your full information"}); 
        
    var tag = { "name_tag": name_tag, "link": link };
    
    await Tags.findOneAndUpdate({"id_number":id_number}, tag, {new: true}, async (err, data) =>{
        if (!data || err) return res.status(200).json({"successes":false, "reason":"Error!!"});   
        return res.status(200).json({successes:true, data});
    }); 
});

// remove Tag
router.post('/remove-tag', async(req,res) =>{
    
    const {token , id_number} = req.body

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    if (checkUser.auth_admin !== "Y") return res.status(200).json({"successes":false,"reason":"Auth pemission"})
    await Tags.findOneAndRemove({"id_number":id_number}).exec(function(err,data){
        if (!data || err) return res.status(200).json({"successes":false,"reason":"Error or Not found"})
        return res.status(200).json({"successes":true})
    });
});

module.exports = router