const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "h3ll00p@gmail.com", // generated ethereal user
        pass: "hi73ndr4", // generated ethereal password
    }
})