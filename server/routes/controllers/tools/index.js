
const Users = require('../../../db/models/users/userSchema');
const {Products} = require('../../../db/models/products/productSchema');

async function validatorPhoneNumber(phone_number){
    if(phone_number.length < 8 || phone_number.length > 15) return new Promise((resolve, reject) => reject('Phone numbers cannot be greater than 15 characters or less than 8 characters !'));
    
    else if (phone_number.indexOf(' ') > 0) return new Promise((resolve, reject) => reject('Phone number must not have spaces !'));
    
    else if ( ! Number.isInteger(Number(phone_number))) return new Promise((resolve, reject) => reject('Phone number must be number !'));
    
    return true;
}

async function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(email)){
        const format = email.split("@")[1]
        const form = format.split(".")[0]
        
        if(form == "gmail"){ return true } 
        else return new Promise((resolve, reject) => reject('Email error format!'));
    } 
    else return new Promise((resolve, reject) => reject('Email error format!'));
}

async function checkPhoneNumber (phone_number){
    var temp =  Number(phone_number) !== NaN ? Number(phone_number) :  phone_number
    if(Number.isInteger(temp)){
        var checkPhone =  await Users.findOne({"phone_number":temp})
        if(checkPhone !== null && checkPhone !== undefined && checkPhone !== "") { return new Promise((resolve, reject) => reject('Phone number is used !')); }
        else return true 
    }
    else  return new Promise((resolve, reject) => reject('Phone is no valid.')); 
}

async function checkUserName (username){
    var userName = await Users.findOne({"username":username})
    if(userName !== null && userName !== undefined && userName !== "") return new Promise((resolve, reject) => reject('Username is used !')); 
    else return true 
}

async function checkEmail(email){
    var checkEmail =  await Users.findOne({"email":email})
    if(checkEmail !== null && checkEmail !== undefined && checkEmail !== "") { return new Promise((resolve, reject) => reject('Email is used !')); }
}

async function checkfield (username,phone_number, password, fullname, email){
    if(!username || !phone_number || !email || !password || !fullname) return new Promise ((resolve, reject) => reject('Enter full information !')); 
}

async function getUserDetail(idNumber){ return await Users.findOne({"idNumber":idNumber}).exec() }

async function getUserDetailByCode(code){ return await Users.findOne({"code":code})}

// Product
async function validatorNameProduct (name_product){
    if(name_product.length < 5 ) return new Promise((resolve, reject) => reject('Name product cannot be less than 5 characters !'));
    else return true;
}

async function getProductDetail(id_number){ return await Products.findOne({"id_number":id_number}).exec() }

async function getLengthProduct(){ return await Products.find({}) }

async function getLengthProductOfUser(user_id){ return await Products.find({"user_id": user_id})}

async function getLengthProductIndex(){ return await Products.find({"showIndex": true, "total_quantity": {$gt: 0}}) }

module.exports = {
    checkPhoneNumber, checkEmail, checkfield, validatorPhoneNumber, getUserDetail, validatorNameProduct, 
    getProductDetail, getLengthProduct, getLengthProductIndex, getLengthProductOfUser, 
    checkUserName, validateEmail, getUserDetailByCode 
};