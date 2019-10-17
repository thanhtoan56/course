const axios = require('axios');
const bigDecimal = require('js-big-decimal');

const { system } = require('../../../config/app');

function calculatePercent(total_pay){ return bigDecimal.add(bigDecimal.round(total_pay, 5), -0.01) }

async function sendBlood(adress_sender, address_receiver, amount){
    return await axios.post('http://178.128.17.105:3113', {
        "method":"sendfromaddress",
        "params":[`${adress_sender}`, `${address_receiver}`, amount],
        "id":1,
        "jsonrpc":"1.0",
        "apikey":system.apikey,
        timeout: system.timeout
    })
    .then( async data => {
        if(data.data.result )  return  true 
        if(data.data.error )  return  data.data.error.message 
    })
}

module.exports = { calculatePercent, sendBlood };