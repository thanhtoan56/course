const mongoose = require('mongoose');

const contentsSchema = new mongoose.Schema({
    
    id_number: { type: Number },

    name_content:{type: String, required: true},

    des_content: {type: String},

    image_content: { type: String },

    detail_content: { type: String },

    link: { type: String },

    cate :{ type: Number,default:""},

    tags :{ type: String },
    
    created_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) },

    updated_at:{ type: Number, default: parseInt ( new Date().getTime() / 1000 ) }
});

const Contents = mongoose.model('contents', contentsSchema)

module.exports = { Contents };