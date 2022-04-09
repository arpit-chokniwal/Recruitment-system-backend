const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    "companyName":{ type:String, required:true },
    "city":{ type:String, required:true },
    "jobTitle":{ type:String, required:true },
    "jobDescription":{ type:String, required:true },
    "experience":{ type:Number, required:true },
    "salary":{ type:Number, required:true },
    "companyImageUrl":{ type:String, required:true },
    "dateOfPost":{ type:String, required:true },
    "adminSchemaId":{ type:String, required:true }
      
})

module.exports = mongoose.model('Jobs',jobSchema)