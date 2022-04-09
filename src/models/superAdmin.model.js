const mongoose = require('mongoose')

const SuperAdminSchema = new mongoose.Schema({

    "email":{ type:String, required:true, unique:true },
    "password":{ type:String, required:true }
      
},{
    versionKey:false
})

module.exports = mongoose.model('SuperAdmin',SuperAdminSchema)