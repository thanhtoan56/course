const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "tokens";

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const  Tokens  = require('../../../db/models/tokens/tokensSchema');
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//find all tokens
router.get('/', (req, res) => {
    Tokens.find({})
    .then(result => res.status(200).json({"successes": true,"data":result}))
    .catch(err =>  res.status(200).json({"successes": false,"reason":err}));
});

//add token
router.post('/', async (req, res) => {
    var index = 0;
    
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; } 
    else { index = result.index; }
    
    const { token, user_id, } = req.body;
    const token_browser = new Tokens({ "id_number": index, "token": token, "user_id": user_id, });
    
    await token_browser.save(async (err, data) => {
        if(err || !data) return res.status(500).json({"success": false});
        
        tool_insert_index_collection.update_index_collection(name_collection, index);
        return res.status(200).json({"success": true});
    });
});

module.exports = router