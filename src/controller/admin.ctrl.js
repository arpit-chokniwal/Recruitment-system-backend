const express = require('express')
const authCheck = require('../middle/auth')
const rout = express.Router()
const Admin = require('../models/admin.model')

rout.post('/',authCheck,async(req,res)=>{
    try{
        return res.status(201).send({ Status: true });
    }catch(e){
        res.status(400).send(e)
    }
})


rout.get('/',async(req,res)=>{
    try{
        const AllAdmin = await Admin.find().lean().exec()
        return res.status(201).send({AllAdmin})

    }catch(e){
        res.status(400).send(e)
    }
})

rout.patch('/:id',async(req,res)=>{
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(201).send({updatedAdmin})
    }catch(e){
        res.status(400).send(e)
    }
})

rout.delete('/:id',async(req,res)=>{
    try{
        const deleteAdmin = await Admin.findByIdAndDelete(req.params.id)
        return res.status(201).send({deleteAdmin})

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = rout