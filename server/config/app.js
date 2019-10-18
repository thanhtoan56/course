const nodemailer = require('nodemailer')
const Hashids = require('hashids');

const key  = "1234Aabc@#";
const keyCart = "bloodCompany"

function sendEmail (emailUser, code) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nguyenthanhtoan5696@gmail.com',
          pass: 'sykxkjuhgjwfpwxn'
        }
    });
    var mailOptions = {
        from: 'nguyenthanhtoan5696@gmail.com',
        to: emailUser,
        subject: 'Mã xác thực email',
        text: code
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { console.log(error); } 
        else { console.log('Email sent: ' + info.response); }
    });
}

function hashAuthen(emailUser) {
    var hashids = new Hashids(emailUser + key, 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    var timeNow = parseInt(new Date().getTime() / 1000);
    return hashids.encode(timeNow);
}

module.exports = { sendEmail, hashAuthen, keyCart }