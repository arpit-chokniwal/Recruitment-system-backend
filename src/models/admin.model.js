const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    companyName:{ type:String, unique:true },
	userName:{ type:String, unique:true },
    "email":{ type:String, required:true, unique:true },
    "password":{ type:String, required:true }
      
},{
    versionKey:false
})

module.exports = mongoose.model('Admin',adminSchema)