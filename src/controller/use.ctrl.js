const express = require('express')
const rout = express.Router()
const User = require('../models/user.model')
const uplode = require('../middle/file')

rout.post('/',async(req,res)=>{
    
    try{
        // const NewUser = await User.create({
        //      first_name  : req.body.first_name,
        //      last_name  : req.body.last_name ,
        //      resume  : req.file.path,
        //      middleName :req.body.middleName ,
        //      streetAddress : req.body.streetAddress ,
        //      landMark :req.body.landMark ,
        //      city :req.body.city ,
        //      state :req.body.state ,
        //      gender :req.body.gender ,
        //      pincode :req.body.pincode ,
        //      email :req.body.email ,
        //      mobile :req.body.mobile ,
        //      experience :req.body.experience ,
        //      qualification :req.body.qualification ,
        //      isShortListed :req.body.isShortListed ,
        //      isInterviewScheduled :req.body.isInterviewScheduled ,
        //      interviewDateTime :req.body.interviewDateTime ,
        //      isHired :req.body.isHired ,
        //      jobSchemaId :req.body.jobSchemaId 
        // })

        const NewUser = await User.create(req.body)

        return res.status(201).send(NewUser)
    }catch(e){
        res.status(400).send(e.message)
    }

})


rout.get('/',async(req,res)=>{
    try{
        const AllUser = await User.find() .populate({ path:  "jobSchemaId" , select: [ "companyName" ,  "jobTitle" , "city" , "salary" ],populate:{path: "adminSchemaId" ,select:[ "companyName" , "userName" , "email" ]}  }).lean().exec();

        return res.status(201).send(AllUser)

    }catch(e){
     res.status(400).send(e.message)       
    }
})



rout.get('/:id',async(req,res)=>{
    try{
        const AllJob = await User.find({jobSchemaId:req.params.id}).populate({ path: "jobSchemaId", select: ["companyName", "city", "jobTitle","salary"],populate:{path: "adminSchemaId", select: ["companyName", "userName", "email"]} }).lean().exec()
        // console.log(AllJob)
        
        return res.status(201).send(AllJob)

    }catch(e){
        res.status(400).send(e.message)
    }
})



rout.patch('/:id', async(req,res)=>{
    try{
        const UpdateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        
        const data = await User.find({jobSchemaId:UpdateUser.jobSchemaId}).lean().exec()
        
        return res.status(201).send(data)
        
    }catch(e){
        res.status(400).send(e.message)
    }
})





rout.delete('/:id',async(req,res)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        return res.status(201).send({deleteUser})
    }catch(e){
        res.status(400).send(e.message)
    }
})




module.exports = rout