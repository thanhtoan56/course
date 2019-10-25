const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/course', {
    mongoose.connect('mongodb://toan:thanhtoan123456@ds335648.mlab.com:35648/course', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})