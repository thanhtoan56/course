const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    idNumber: { type: Number },

    fullName:{ type: String, required: true },

    code:{ type: String, required: true },

    email:{
        type: String, required: true,
        validate(value){
            if(value.indexOf(' ') > 0) { throw new Error('Email không được có khoảng trắng!!'); }
            
            if(!validator.isEmail(value)) { throw new Error('Sai định dạng Email!!'); }
        }
    },

    userName: {type: String },

    passWord:{ type: String }, //sha256(md5(passWord))

    decentralise: {type: String }, // admin-teacher-student

    headOfChemistry: {type: String, default:"n" }, // truong bo mon

    created_at:{ type: Number, default: parseInt(new Date().getTime() / 1000)},

    updated_at:{ type: Number, default: parseInt(new Date().getTime() / 1000)}
});

const User = mongoose.model('users', userSchema)

module.exports = User;