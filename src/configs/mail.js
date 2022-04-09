const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "", // generated ethereal user
        pass:"", // generated ethereal password
    }
})