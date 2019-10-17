const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//get all indexs
router.get('/', async (req,res) => {
    await indexS.find({})
    .then(result => res.send(result))
    .catch((err) => res.send(err));
});

//add indexs
router.post('/', (req, res) => {
    const indexs = new indexS({ "nameCollection": req.body.nameCollection, "index": req.body.index });
    try {
       indexs.save();
       res.send(indexs); 
    } catch(err) { res.send(err); }
})

module.exports = router