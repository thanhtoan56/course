const express = require('express');
const cron = require('node-cron');
const router = express.Router();
const axios = require('axios');
const lodash = require('lodash');
const bigDecimal = require('js-big-decimal');
const bodyParser = require('body-parser');

const name_collection = "payments";
const name_collection_2 = "notifications";
const name_collection_3 = "orders";

require('../../../db/index');
const check = require('../functions/general')
const { system } = require('../../../config/app');
const { calculatePercent, sendBlood }  = require('../functions/send_blood');
const tool_insert_index_collection = require('../functions/insert_index_collection');

const Users = require('../../../db/models/users/userSchema');
const indexS = require('../../../db/models/indexs/indexsSchema');
const { Carts } = require('../../../db/models/carts/cartsSchema');
const { Orders } = require('../../../db/models/orders/ordersSchema');
const { Products} = require('../../../db/models/products/productSchema');
const { Payments } = require('../../../db/models/payments/paymentsSchema');
const { Notifications } = require('../../../db/models/notifications/notificationsSchema');

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/statistics', async (req, res) => {
    const { token } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if ((checkUser !="" ) || (checkUser.auth_admin === "Y")) {
        const list_order_new = await Orders.find({"user_id": checkUser.id_number}).sort({id_number: -1})
        const list_order_successed = await Orders.find({"user_id": checkUser.id_number, "completed": true}).sort({id_number: -1})
        const list_order_cancelled = await Orders.find({"user_id": checkUser.id_number,"seller_confirm": false, "cancelled": {$gt: 0}}).sort({id_number: -1}).limit(5)

        const list_product_new = await Products.find({"user_id": checkUser.id_number}).sort({id_number: -1})
        
        // if(list_order_new == "" || list_product_new == "") return res.status(200).json({"successes":false, "reason":"List order or product is not defined"})
        return res.status(200).json({"successes":true, list_order_new, list_order_successed, list_order_cancelled, list_product_new})
    
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
})
// Quet Payment: Ko shop nao xac nhan thi xoa payment
cron.schedule('* * * * * *', async () => {
    await Payments.find({"seller_confirm": false, "cancelled": 0, "completed": false, "created_timestamp":{$lt:parseInt(new Date / 1000) - 240}}).exec(async (err,payments) =>{
        if(payments != ""){
            for( let i = 0; i <payments.length; i ++){
                const item_payment = await Payments.findOne({"id_number": payments[i].id_number});
                
                var index = 0;
                const result = await indexS.findOne({'nameCollection': name_collection_2});
                if(result == null) { tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index = 1; }
                else { index = result.index; }
                
                // Tao thong bao cho nguoi mua
                var title = "HỦY ĐƠN HÀNG";
                var content = "Đơn hàng mua vào " + new Date(item_payment.created_timestamp*1000).toLocaleString() + " của bạn đã bị hủy do chưa nhận được xác nhận từ các shop. Vui lòng chọn mua sản phẩm khác từ chúng tôi. Xin cám ơn !"
                const notification = new Notifications({
                    "id_number": index,
                    "title": title,
                    "content": content,
                    "payment_id": payments[i].id_number,
                    "user_id":item_payment.user_id,
                    "created_at":parseInt(new Date() / 1000)
                });
                await notification.save() 
                await tool_insert_index_collection.update_index_collection(name_collection_2, index) 
            }
            await Payments.updateMany({"seller_confirm": false, "cancelled": 0, "completed": false, "created_timestamp":{$lt:parseInt(new Date / 1000) - 240}}, {"cancelled": 2})
        }
    });
});

// Quet Order
cron.schedule('* * * * * *', async () => {
    await Orders.find({"seller_confirm": false, "cancelled": 0, "completed": false, "created_timestamp":{$lt:parseInt(new Date / 1000) - 180}}).exec(async (err,orders) =>{
        if(orders != ""){
            for( let i = 0; i <orders.length; i ++){

                var payment = await Payments.findOne({"id_number": orders[i].payment_id})
                var list_product_payment = JSON.parse(payment.list_product)
                
                // Cap nhat lai total_quantity cua shop
                const item_list_product = JSON.parse(orders[i].list_product)
                for( let j = 0; j <item_list_product.length; j ++){

                    // update state list_product in order
                    item_list_product[j].state = 2

                    // update state list_product in payment
                    list_product_payment[list_product_payment.findIndex(el => el.id_number === item_list_product[j].id_number)] = item_list_product[j];

                    const item_product = await Products.findOne({"id_number": item_list_product[j].id_number});
                    await Products.findOneAndUpdate({"id_number": item_list_product[j].id_number}, {"total_quantity": item_product.total_quantity + item_list_product[j].quantity})
                }
                
                var index = 0;
                const result = await indexS.findOne({'nameCollection': name_collection_2});
                if(result == null) { tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index = 1; }
                else { index = result.index; }

                const shop = await Users.findOne({"id_number": orders[i].user_id})
                // Tao thong bao cho nguoi mua
                var title = "HỦY SẢN PHẨM";
                var content = item_list_product.length + " sản phẩm mà bạn đã mua từ " + shop.name_shop + " vào ngày " + new Date(orders[i].created_timestamp*1000).toLocaleString() + " đã bị hủy bởi chủ shop. Vui lòng xem lại lịch sử đơn và chọn mua sản phẩm khác từ chúng tôi. Xin cám ơn !"
                const notification = new Notifications({
                    "id_number": index,
                    "title": title,
                    "content": content,
                    "user_id":orders[i].buyer_id,
                    "payment_id":orders[i].payment_id,
                    "created_at":parseInt(new Date() / 1000)
                });
                await notification.save();
                await tool_insert_index_collection.update_index_collection(name_collection_2, index);

                // check list product in order = list product payment
                var paymentUpdate = {"list_product":JSON.stringify(list_product_payment) }
                if(lodash.differenceWith(list_product_payment, item_list_product, lodash.isEqual) == ""){ paymentUpdate.cancelled = 2 }
                
                await Payments.findOneAndUpdate({"id_number": orders[i].payment_id}, paymentUpdate)

                const orderUpdate = { "cancelled": 2, "list_product": JSON.stringify(item_list_product) }
                await Orders.findOneAndUpdate({"id_number": orders[i].id_number}, orderUpdate)

                const user = await Users.findOne({"id_number": payment.user_id})

                // await axios.post('http://178.128.17.105:3113', {
                //     "method":"sendfromaddress",
                //     "params":[`${system.wallet_address}`, `${user.wallet_address}`, orders[i].total_pay],
                //     "id":1,
                //     "jsonrpc":"1.0",
                //     "apikey":system.apikey,
                //     timeout: system.timeout
                // })
                 
            }
        } 
    });

});

router.post('/notification', async (req, res) => {
    const { token, offset } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    const notifications = await Notifications.find({"user_id": user.id_number});
    
    if( notifications == "" || notifications == null || notifications == undefined)  return res.status(200).json({"successes":false,"reason":"Notifications is not define!!"});
    
    var x = 0
    if(Number(offset) === 1){ x = 0 }
    else { x = (offset - 1) * 5 }
    
    await Notifications.find({"user_id": user.id_number, "isReaded": false}).sort({created_at: -1}).limit(5).skip(Number(x)).exec(async (err, data) =>{
        if(err || !data) return res.status(200).json({"successes":false, "reason":"Error or Not found"})
        return res.status(200).json({"successes":true, "data":data,"count":notifications.length})
    });
});

//delete one notification
router.post('/delete-notification', async (req, res) => {
    const { token, id_number } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    const notification = await Notifications.findOne({"id_number": id_number })
    if(notification == "") return res.status(200).json({"successes":false,"reason":"Notification is not defined"})
    
    if((notification.user_id === user.id_number) || (user.auth_admin === "Y")){
        await Notifications.findOneAndRemove({"id_number": id_number}).exec(async (err, data) => {
            if(err || !data) return res.status(200).json({successes: false, reason: err.message })
            return res.status(200).json({successes:true})
        });
    } else return res.status(200).json({"successes":false,"reason":"Notification is invalid"}) 
});

//delete all notification
router.post('/delete-all-notifications', async (req, res) => {
    const { token } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;
    
    const notifications = await Notifications.find({"user_id": user.id_number })
    if (notifications == "" )  return res.status(200).json({"successes": false,"reason": "Notifications is empty"})
    
    if ((notifications[0].user_id == user.id_number) || (user.auth_admin === "Y")) {
        await Notifications.find({"user_id": user.id_number, "isReaded": false}).exec(async (err, data) =>{
            if(err || !data)  return res.status(200).json({successes: false, reason: err.message })
            return res.status(200).json({successes:true, data})
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
});

router.post('/', async (req, res) => {
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
    else { index = result.index; }

    // const { token, appId, list_product, user_id, buyer_fullname, buyer_phonenumber, buyer_address } = req.body;
    const { token, appId, user_id, buyer_fullname, buyer_phonenumber, buyer_address } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    if (( user.id_number == user_id) || (user.auth_admin === "Y")) {

        // Check wallet_address and balance
        if(user.wallet_address == "") return res.status(200).json({successes: false, reason: "Invalid wallet address. Please create a wallet address!" });
        // if(user.balance < total_pay) return res.status(200).json({successes: false, reason: "Account balance is not enough to purchase" });
        
        var listCart = await Carts.aggregate([
            {$match: {"appId": appId}},
            { $lookup: {from: "products", localField: "idProduct", foreignField: "id_number", as: "infoProduct"} },
            { $unwind: "$infoProduct"},
            { $project: {_id:"$_id: 0", id_number: "$idProduct", quantity: "$quantity" ,name_product:"$infoProduct.name_product", link:"$infoProduct.link", price_origin: "$infoProduct.price_origin", price_promotion: "$infoProduct.price_promotion", image_main: "$infoProduct.image_main", total_quantity: "$infoProduct.total_quantity"}},
        ])
        var total_pay = 0
        var arrId = []
        for (let i = 0; i < listCart.length; i++) {
            // Tinh total payment cho khach: total_pay
            if (listCart[i].price_promotion != null) { total_pay += listCart[i].quantity * listCart[i].price_promotion }
            else { total_pay += listCart[i].quantity * listCart[i].price_origin }

            const item = await Products.findOne({"id_number": listCart[i].id_number});
            if(item.user_id == user.id_number){
                return res.status(200).json({successes: false, reason: "Bạn không thể mua sản phẩm " + item.name_product + " vì nó là sản phẩm của shop bạn. Vui lòng chọn mua sản phẩm khác." });
            }
            if(item.total_quantity < listCart[i].quantity){
                return res.status(200).json({successes: false, reason: "Số lượng sản phẩm " + item.name_product + " trong kho chỉ còn " + item.total_quantity +". Vui lòng nhập lại số lượng." });
            }
            listCart[i].state = 0
            listCart[i].user_id = item.user_id
            arrId.push(item.user_id)
            
        }
        // Then send blood to wallet_address system
        // Send and check status send blood successes ? true : false

        // const data_send = await sendBlood(user.wallet_address, system.wallet_address, bigDecimal.round(total_pay, 5));
        // if(data_send != true) return res.status(200).json({"successes": false, "reason": data_send })

        //  Set object để lưu trữ một tập hợp các giá trị duy nhất sau đó sử dụng toán tử trải rộng để xây dựng một mảng mới. //
        const arr_userIds = [...new Set(arrId)] 
        
        var index_2 = 0;
        const result_2 = await indexS.findOne({'nameCollection': name_collection_2});
        if(result_2 == null){  tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index_2 = 1; }
        else { index_2 = result_2.index; }

        var title = "ĐƠN HÀNG";
        var content = "Thành công !! Bạn vừa đặt mua sản phẩm từ hệ thống."
        const notification_buyer = new Notifications({ 
            "id_number": index_2, 
            "title": title, 
            "content": content, 
            "user_id":user.id_number, 
            "payment_id": index, 
            "created_at": parseInt(new Date() / 1000) 
        });
        await notification_buyer.save();
        await tool_insert_index_collection.update_index_collection(name_collection_2, index_2);
        

        // /** Tạo thông báo đến shop: có người đặt hàng **/ 
        for (let k = 0; k < arr_userIds.length; k++){
            const result = await indexS.findOne({'nameCollection': name_collection_2});
            if(result == null){  tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index_2 = 1; }
            else { index_2 = result.index; }
            
            var title = "ĐƠN HÀNG";
            var content = buyer_fullname + " vừa đặt mua sản phẩm từ shop."
            const notification = new Notifications({ 
                "id_number": index_2, 
                "title": title, 
                "content": content, 
                "user_id":arr_userIds[k], 
                "payment_id": index, 
                "created_at": parseInt(new Date() / 1000) 
            });
            await notification.save();
            await tool_insert_index_collection.update_index_collection(name_collection_2, index_2);
        }

        /** Tao order den shop khi co nguoi dat hang o shop **/ 
        var index_3 = 0;
        for (let k = 0; k < arr_userIds.length; k++){
            const result = await indexS.findOne({'nameCollection': name_collection_3});
            if(result == null) { tool_insert_index_collection.insert_index_collection(name_collection_3, 1); index_3 = 1; }
            else { index_3 = result.index; }
            
            const list_product_of_shop = []
            for( let i = 0; i <listCart.length; i ++){
                // const item = await Products.findOne({"id_number": listCart[i].id});
                if(listCart[i].user_id == arr_userIds[k]) { list_product_of_shop.push(listCart[i]) }
            }

            var total_payment = 0
            for( let i = 0; i <list_product_of_shop.length; i ++){
                if (list_product_of_shop[i].price_promotion != null) { total_payment += list_product_of_shop[i].quantity * list_product_of_shop[i].price_promotion }
                else { total_payment += list_product_of_shop[i].quantity * list_product_of_shop[i].price_origin }
            }
            
            const order = new Orders({
                "id_number": index_3,
                "payment_id": index,
                "list_product": JSON.stringify(list_product_of_shop),
                "total_pay": total_payment,
                "user_id":arr_userIds[k],
                "buyer_id":user.id_number, 
                "buyer_fullname": buyer_fullname, 
                "buyer_phonenumber": buyer_phonenumber, 
                "buyer_address": buyer_address,
                "created_timestamp": parseInt(new Date() / 1000)
            });
            await order.save();
            await tool_insert_index_collection.update_index_collection(name_collection_3, index_3);
        }
        
        /** Create Payment **/
        const payment = new Payments({
            "id_number": index,
            "list_product": JSON.stringify(listCart),
            "total_pay": total_pay,
            "user_id": user.id_number,
            "buyer_fullname": buyer_fullname,
            "buyer_phonenumber": buyer_phonenumber,
            "buyer_address": buyer_address,
            "created_timestamp": parseInt(new Date() / 1000)
        });

        await payment.save(async (err, data) =>{
            if(err || ! data) return res.status(200).json({successes: false, reason: "err.message" })
            for( let i = 0; i <listCart.length; i ++){
                const item_product = await Products.findOne({"id_number": listCart[i].id_number});
                await Products.findOneAndUpdate({"id_number": listCart[i].id_number}, {"total_quantity": item_product.total_quantity - listCart[i].quantity})
            }
            await tool_insert_index_collection.update_index_collection(name_collection, index);
            return res.status(200).json({successes:true, data})
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
})

router.post('/list-order', async (req, res) => {
    const { token} = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    await Payments.find({"user_id": user.id_number}).exec(async (err, data) =>{
        if(err || !data) return res.status(200).json({successes: false, reason: err.message })
        return res.status(200).json({successes:true, data})
    });
})

// Shop accept order
router.post('/shop-accept-order', async (req, res) => {
    const { token, id_number } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const user = checkToken.data;

    var order = await Orders.findOne({"id_number": Number(id_number)});
    if(order == "" || user.id_number != order.user_id) return res.status(200).json({"successes": false, "reason": "Order is not defined"})

    var payment = await Payments.findOne({"id_number": order.payment_id})

    var list_product_payment = JSON.parse(payment.list_product)
    var list_product = JSON.parse(order.list_product)
    
    for(let i = 0; i < list_product.length; i++){
        // update state list_product in order
        list_product[i].state = 1
        
        // update state list_product in payment
        list_product_payment[list_product_payment.findIndex(el => el.id_number === list_product[i].id_number)] = list_product[i];
    }
    
    const paymentUpdate = {"seller_confirm": true, "list_product":JSON.stringify(list_product_payment) }
    await Payments.findOneAndUpdate({"id_number": order.payment_id}, paymentUpdate)
    
    const orderUpdate = { "seller_confirm": true, "list_product":  JSON.stringify(list_product)}
    await Orders.findOneAndUpdate({"id_number": id_number}, orderUpdate).exec(async (err, data) =>{
        if(err || !data) return res.status(200).json({successes: false, reason: err.message })
        return res.status(200).json({successes:true, data: order})
    });
});

router.post('/shop-cancel-order', async (req, res) => {
    const { token, id_number } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var order = await Orders.findOne({"id_number": Number(id_number)});
    if(order == "" || checkUser.id_number != order.user_id) return res.status(200).json({"successes":false,"reason":"Order is not defined"})

    var payment = await Payments.findOne({"id_number": order.payment_id})

    var list_product_payment = JSON.parse(payment.list_product)
    const item_list_product = JSON.parse(order.list_product)
    
    var index = 0;
    const result = await indexS.findOne({'nameCollection': name_collection_2});
    if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index = 1; }
    else { index = result.index; }
    
    const shop = await Users.findOne({"id_number": order.user_id})

    // Tao thong bao cho nguoi mua sp da bi shop huy
    var title = "HỦY SẢN PHẨM";
    var content = item_list_product.length + " sản phẩm mà bạn đã mua từ " + shop.name_shop + " vào ngày " + new Date(order.created_timestamp*1000).toLocaleString() + " đã bị hủy bởi chủ shop. Vui lòng xem lại lịch sử đơn và chọn mua sản phẩm khác từ chúng tôi. Xin cám ơn !"
    const notification = new Notifications({
        "id_number": index,
        "title": title,
        "content": content,
        "user_id":order.buyer_id,
        "payment_id": order.payment_id,
        "created_at":parseInt(new Date() / 1000)
    });
    await notification.save();
    await tool_insert_index_collection.update_index_collection(name_collection_2, index);
    
    // Update: total_quantity in Product, state list_product in order, state list_product in payment
    for( let j = 0; j <item_list_product.length; j ++){
        
        item_list_product[j].state = 2 // update state list_product in order

        // update state list_product in payment
        list_product_payment[list_product_payment.findIndex(el => el.id_number === item_list_product[j].id_number)] = item_list_product[j];

        const item_product = await Products.findOne({"id_number": item_list_product[j].id_number});
        await Products.findOneAndUpdate({"id_number": item_list_product[j].id_number}, {"total_quantity": item_product.total_quantity + item_list_product[j].quantity})
    }

    var countCanceled = 0
    for( let j = 0; j <list_product_payment.length; j ++){
        // check state completed
        if(list_product_payment[j].state == 2) { countCanceled +=  1 }
    }

    // check list product in order = list product payment
    var paymentUpdate = {"list_product":JSON.stringify(list_product_payment) }
    if(countCanceled == list_product_payment.length ) {
        paymentUpdate.cancelled = 2
    }
    
    await Payments.findOneAndUpdate({"id_number": order.payment_id}, paymentUpdate)
    const user = await Users.findOne({"id_number": payment.user_id})
    
    const orderUpdate = { "cancelled": 2, "list_product": JSON.stringify(item_list_product) }

    // Tính tiền cho customer

    // const data_send = await sendBlood(system.wallet_address, user.wallet_address, bigDecimal.round(order.total_pay, 5)) ;
    // if(data_send != true) return res.status(200).json({"successes": false, "reason": data_send })
    
    await Orders.findOneAndUpdate({"id_number": id_number}, orderUpdate).exec(async (err, data) =>{
        if(err || !data) return res.status(200).json({successes: false, reason: err.message })
        return res.status(200).json({successes:true, })
    });
});

// Customer cancel 
router.post('/user-cancel', async (req, res) => {
    const { token, id_number } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var payments = await Payments.find({"id_number": id_number, "created_timestamp":{$gt:parseInt(new Date / 1000) - 180}})
    
    if(payments[0] != undefined){
        if(payments[0].seller_confirm == true ) return res.status(200).json({"successes":false,"reason":"Can not cancel. Because payment is accepted by shop"})
    } else return res.status(200).json({"successes":false,"reason":"Time out for cancel"})
    
    if((checkUser.id_number === payments[0].user_id) || (checkUser.auth_admin === "Y")){
        
        // Send and check status send blood successes ? true : false
        
        // const data_send = await sendBlood(system.wallet_address, checkUser.wallet_address, calculatePercent( payments[0].total_pay)) ;
        // if(data_send != true) return res.status(200).json({"successes": false, "reason": data_send })
        
        var list_product_payment = JSON.parse(payments[0].list_product)
        var orders = await Orders.find({"payment_id": id_number})
        
        for( let i = 0; i <orders.length; i ++){
            // update state list_product in order
            const item_list_product = JSON.parse(orders[i].list_product)
            let list_product_order_update = item_list_product.map((value, index, animals) => { value.state = 2;  return value })
            await Orders.findOneAndUpdate({"id_number": orders[i].id_number}, {"cancelled": 1, "list_product": JSON.stringify(list_product_order_update)})

            var index = 0;
            const result = await indexS.findOne({'nameCollection': name_collection_2});
            if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index = 1; }
            else { index = result.index; }
            
            // Tao thong bao cho shop
            var title = "HỦY SẢN PHẨM";
            var content = checkUser.fullname  + " đã hủy mua " + item_list_product.length + " sản phẩm vào ngày " + new Date(orders[i].created_timestamp*1000).toLocaleString() + " từ shop." 
            const notification = new Notifications({
                "id_number": index,
                "title": title,
                "content": content,
                "user_id":orders[i].user_id,
                "payment_id":orders[i].payment_id,
                "created_at":parseInt(new Date() / 1000)
            });
            await notification.save();
            await tool_insert_index_collection.update_index_collection(name_collection_2, index);
        }

        for( let j = 0; j <list_product_payment.length; j ++){
            // update state list_product in order
            list_product_payment[j].state = 2

            // update total_quantity in product
            const item_product = await Products.findOne({"id_number": list_product_payment[j].id_number});
            await Products.findOneAndUpdate({"id_number": list_product_payment[j].id_number}, {"total_quantity": item_product.total_quantity + list_product_payment[j].quantity})
        }

        await Payments.findOneAndUpdate({"id_number": payments[0].id_number}, {"cancelled": 1, "list_product": JSON.stringify(list_product_payment)}).exec(async (err, data) =>{
            if(err || !data) return res.status(200).json({successes: false, reason: err.message })
            return res.status(200).json({successes:true})
        });
    
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
});

router.post('/user-received', async (req, res) => {
    const { token, id_number } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;
    
    var payment = await Payments.findOne({"id_number": id_number})
    if(payment == "") return res.status(200).json({"successes":false,"reason":"Payment is not defined"})

    if((checkUser.id_number === payment.user_id) || (checkUser.auth_admin === "Y")){
        
        var list_product_payment = JSON.parse(payment.list_product)

        var countReceived = 0
        var countCanceled = 0

        if(req.body.user_id_shop){

            var order = await Orders.findOne({"payment_id": id_number, "user_id": req.body.user_id_shop, "seller_confirm": true, "completed": false})
            const user = await Users.findOne({"id_number": order.user_id})
            
            // Tính tiền cho shop 
            // Send and check status send blood successes ? true : false

            // const data_send = await sendBlood(system.wallet_address, user.wallet_address, calculatePercent(order.total_pay)) ;
            // if(data_send != true) return res.status(200).json({"successes": false, "reason": data_send })

            const item_list_product = JSON.parse(order.list_product)
            var list_product_order_update = item_list_product.map((value, index, animals) => { value.state = 3; return value })
            await Orders.findOneAndUpdate({"id_number": order.id_number}, {"completed": true, "list_product": JSON.stringify(list_product_order_update)})
            

            // Start Update state list_product in payment
            for( let j = 0; j <list_product_payment.length; j ++){
                if(list_product_order_update[0].user_id == list_product_payment[j].user_id){
                    if(list_product_payment[j].state == 1)  list_product_payment[j].state = 3; countReceived +=  1 
                } else {
                    if(list_product_payment[j].state == 2)  countCanceled +=  1 
                    else if(list_product_payment[j].state == 3)  countReceived +=  1 
                }
            }
            
            // Tạo thông báo cho shop: User đã nhận dc hàng
            var index_2 = 0;
            const result_2 = await indexS.findOne({'nameCollection': name_collection_2});
            if(result_2 == null){  tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index_2 = 1; }
            else { index_2 = result_2.index; }

            var title = "ĐƠN HÀNG";
            var content = checkUser.fullname + " đã nhận hàng." + " Đơn hàng #"+ id_number + " đã hoàn thành !! "
            const notification_shop = new Notifications({ 
                "id_number": index_2, 
                "title": title, 
                "content": content, 
                "user_id": req.body.user_id_shop, 
                "payment_id": id_number, 
                "created_at": parseInt(new Date() / 1000) 
            });
            await notification_shop.save();
            await tool_insert_index_collection.update_index_collection(name_collection_2, index_2);
        } else {
            // Start Update state list_product in order
            var orders = await Orders.find({"payment_id": id_number, "seller_confirm": true, "completed": false})
            for( let i = 0; i <orders.length; i ++){
                const item_list_product = JSON.parse(orders[i].list_product)
                var list_product_order_update = item_list_product.map((value, index, animals) => { value.state = 3; return value })
                // Tính tiền cho shop
                await Orders.findOneAndUpdate({"id_number": orders[i].id_number}, {"completed": true, "list_product": JSON.stringify(list_product_order_update)})
            }
            
            // Start Update state list_product in payment
            for( let j = 0; j <list_product_payment.length; j ++){
                if(list_product_payment[j].state == 1) { list_product_payment[j].state = 3; countReceived +=  1 }
                // check state completed
                else if(list_product_payment[j].state == 2) { countCanceled +=  1 }
                else if(list_product_payment[j].state == 3) { countReceived +=  1 }
            }
        }

        //  "completed": true, 
        var paymentUpdate = {"list_product": JSON.stringify(list_product_payment)}
        if(countCanceled > 0) {
            if(countReceived == list_product_payment.length - countCanceled) paymentUpdate.completed = true
        } else {
            if(countReceived == list_product_payment.length) paymentUpdate.completed = true
        }
        
        if( paymentUpdate.completed == true) {
            // Tạo thông báo cho người mua: Đơn hàng đã hoàn thành
            var index_3 = 0;
            const result_3 = await indexS.findOne({'nameCollection': name_collection_2});
            if(result_3 == null){  tool_insert_index_collection.insert_index_collection(name_collection_2, 1); index_3 = 1; }
            else { index_3 = result_3.index; }

            var title = "ĐƠN HÀNG";
            var content = "Hoàn thành !! Đơn hàng #" + id_number + " đã được hoàn thành. Cám ơn bạn đã mua hàng tại trang chúng tôi."
            const notification_buyer = new Notifications({ 
                "id_number": index_3, 
                "title": title, 
                "content": content, 
                "user_id": checkUser.id_number, 
                "payment_id": id_number, 
                "created_at": parseInt(new Date() / 1000) 
            });
            await notification_buyer.save();
            await tool_insert_index_collection.update_index_collection(name_collection_2, index_3);
        }

        await Payments.findOneAndUpdate({"id_number": payment.id_number}, paymentUpdate ).exec(async (err, data) =>{
            if(err || !data) return res.status(200).json({successes: false, reason: err.message })
            else return res.status(200).json({successes:true})
        });
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
});

// List payment and order of customer
router.post('/order-detail/:id_number', async (req, res) => {
    const { token} = req.body;
    var { id_number} = req.params;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var payment = await Payments.findOne({"id_number": Number(id_number)});
    if((checkUser.id_number === payment.user_id) || (checkUser.auth_admin === "Y")){
        return res.status(200).json({successes:true, payment})
    } else return res.status(200).json({"successes":false,"reason":"Payment is not defined"})
})

// List order off shop
router.post('/list-order-for-shop', async (req, res) => {
    const { token } = req.body;
    
    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    if ((checkUser !="" ) || (checkUser.auth_admin === "Y")) {
        const list_order_for_shop = await Orders.find({"user_id": checkUser.id_number})
        
        if(list_order_for_shop == "") return res.status(200).json({"successes":false, "reason":"List order is not defined"})
        return res.status(200).json({"successes":true, data: list_order_for_shop})
    
    } else return res.status(200).json({"successes":false,"reason":"User is not defined"})
})

router.post('/shop/order-detail/:id_number', async (req, res) => {
    const { token } = req.body;
    var { id_number} = req.params;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var order = await Orders.findOne({"id_number": Number(id_number)});
    if((order != "" && checkUser.id_number === order.user_id) || (order != "" && checkUser.auth_admin === "Y")){
        return res.status(200).json({successes:true, data: order})
    } else return res.status(200).json({"successes":false,"reason":"Order is not defined"})
})

// Load order-detail by payment_id and user_id from page Notification
router.post('/shop/order-detail', async (req, res) => {
    const { token, payment_id } = req.body;

    const checkToken = await check.checkToken(token)
    if(!checkToken.successes) return res.json({"successes":false, reason: checkToken.reason})
    const checkUser = checkToken.data;

    var order = await Orders.findOne({"payment_id": Number(payment_id), "user_id": checkUser.id_number});
    if(order != ""){
        return res.status(200).json({successes:true, data: order})
    } else return res.status(200).json({"successes":false,"reason":"Order is not defined"})
})

module.exports = router