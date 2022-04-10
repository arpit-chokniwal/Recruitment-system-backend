const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    "companyName":{ type:String, required:true, unique:true  },
    "city":{ type:String, required:true },
    "jobTitle":{ type:String, required:true },
    "jobDescription":{ type:String, required:true },
    "experience":{ type:String, required:true },
    "salary":{ type:String, required:true },
    "companyImageUrl":{ type:String, required:true },
    "dateOfPost":{ type:String, required:true },
    "adminSchemaId":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      }
      
},{
    versionKey:false
})

module.exports = mongoose.model('Jobs',jobSchema)