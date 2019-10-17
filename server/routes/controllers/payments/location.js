const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

require('../../../db/index');
const { Provinces } = require('../../../db/models/provinces/provincesSchema');
const { Districts } = require('../../../db/models/districts/districtSchema');
const { Wards } = require('../../../db/models/wards/wardSchema');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/provinces', async (req, res) => {
    var provinces = await Provinces.find({}).exec()
    return res.status(200).json({"successes":true,data:provinces})
})

router.post('/districts', async (req, res) => {
    var district = req.body.province
    if (district !== "") {
        var districts = await Districts.find({"provinceid":district}).exec()
        return res.status(200).json({"successes":true,data:districts})
    }
})

router.post('/wards', async (req, res) => {
    var ward = req.body.district
    if (ward !== "") {
        var wards = await Wards.find({"districtid":ward}).exec()
        return res.status(200).json({"successes":true,data:wards})
    }
})

module.exports = router
