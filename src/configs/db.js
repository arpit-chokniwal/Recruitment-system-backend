const mongoose = require('mongoose')

require('dotenv').config({ path: '../.env' });

module.exports = () =>{
    return mongoose.connect(process.env.MONGOURL)
}