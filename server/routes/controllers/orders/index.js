const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const name_collection = "orders";

const check = require('../functions/general')

require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Orders } = require('../../../db/models/orders/ordersSchema');
const { Products} = require('../../../db/models/products/productSchema');
const tool_insert_index_collection = require('../functions/insert_index_collection');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    const { token, total_pay, user_id, list_product } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    if ((user.id_number == user_id) || ( user.auth_admin === "Y")) {
        const order = new Orders({
            "id_number": index,
            "list_product": list_product,
            "total_pay": total_pay,
            "user_id": user_id,
        });
        
        for( let i = 0; i <list_product.length; i ++){
            const item = await Products.findOne({"id_number": list_product[i].id_number});
            if(item.total_quantity < list_product[i].quantity)
                return res.status(200).json({successes: false, reason: "Số lượng sản phẩm " + item.name_product + " trong kho chỉ còn " + item.total_quantity +". Vui lòng nhập lại số lượng." });
        }

        await order.save(async (err, data) =>{
            if(err || !data) return res.status(200).json({successes: false, reason: err.message })
            
            for( let i = 0; i <list_product.length; i ++){
                const item_product = await Products.findOne({"id_number": list_product[i].id_number});
                await Products.findOneAndUpdate({"id_number": list_product[i].id_number}, {"total_quantity": item_product.total_quantity - list_product[i].quantity})
            }
            await tool_insert_index_collection.update_index_collection(name_collection, index);
            return res.status(200).json({successes:true, data})
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
})

module.exports = router