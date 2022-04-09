const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    "firstName":{ type:String, required:true },
    "middleName":{ type:String},
    "lastName":{ type:String, required:true },
    "streetAddress":{ type:String, required:true },
    "landMark":{ type:String, required:true },
    "city":{ type:String, required:true },
    "state":{ type:String, required:true },
    "gender":{ type:String, required:true },
    "pincode":{ type:Number, required:true },
    "email":{ type:String, required:true, unique:true },
    "mobile":{ type:Number, required:true, unique:true },
    "experience":{ type:Number, required:true },
    "resume":{ type:String, required:true },
    "qualification":{ type:String, required:true },
    "isShortListed":{ type:Boolean},
    "isInterviewScheduled":{ type:Boolean },
    "interviewDateTime":{ type:String},
    "isHired":{ type:Boolean},
    "jobSchemaId":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
    }
},{
    versionKey:false
})

module.exports = mongoose.model('User',userSchema)