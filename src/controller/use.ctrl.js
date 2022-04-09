const express = require('express')
const rout = express.Router()
const User = require('../models/user.model')
const sendMail = require("../utils/mail.utils");


rout.post('/',async(req,res)=>{
    try{
        const NewUser = await User.create(req.body)
        return res.status(201).send(NewUser)
    }catch(e){
        res.status(400).send(e)
    }
})


rout.get('/',async(req,res)=>{
    try{
        const AllUser = await User.find() .populate({ path: "jobSchemaId", select: ["companyName", "jobTitle","city","salary"],populate:{path:"adminSchemaId",select:["","companyName","userName","email"]}  }).lean().exec();

        return res.status(201).send(AllUser)
        
    }catch(e){
     res.status(400).send(e)       
    }
})


rout.patch('/:id', async(req,res)=>{
    try{
        // console.log(req.body)
        const UpdateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        // console.log(UpdateUser)


        // if(isShortListed){

           
            
        // }

        // if(isInterviewScheduled){
            
        //     const message = `Your'e Interview is Scheduled`;

        //     const user = UpdateUser;
        
        //     sendMail({
        //       from: "h3ll00p@gmail.com",
        //       to: user.email,
        //       subject: `Interview Scheduled for ${user.firstName}`,
        //       text: `Hi ${user.firstName}, ${message}`,
        //     });
        //     return res.status(201).send(UpdateUser)
        // }

        // if(isHired){

        //     const message = `Congratulations You Get Hired`;

        //     const user = UpdateUser;
        
        //     sendMail({
        //       from: "h3ll00p@gmail.com",
        //       to: user.email,
        //       subject: `Offer Letter for ${user.firstName}`,
        //       text: `Hi ${user.firstName}, ${message}`,
        //     });
        //     return res.status(201).send(UpdateUser)
        // }

        return res.status(201).send(UpdateUser)

    }catch(e){
        res.status(400).send(e)
    }
})




rout.delete('/:id',async(req,res)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        return res.status(201).send(deleteUser)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = rout