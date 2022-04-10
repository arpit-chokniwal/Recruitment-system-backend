const express = require('express')
const rout = express.Router()
const Admin = require('../models/admin.model')
const authCheck = require('../middle/auth')

rout.post('/',authCheck,async(req,res)=>{
    try{
        return res.status(201).send({ Status: true });
    }catch(e){
        res.status(400).send(e.message)
    }
})


rout.get('/',async(req,res)=>{
    try{
        const AllAdmin = await Admin.find().lean().exec()
        return res.status(201).send({AllAdmin})

    }catch(e){
        res.status(400).send(e.message)
    }
})

rout.patch('/:id',async(req,res)=>{
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(201).send({updatedAdmin})
    }catch(e){
        res.status(400).send(e.message)
    }
})

rout.delete('/:id',async(req,res)=>{
    try{
        const deleteAdmin = await Admin.findByIdAndDelete(req.params.id)
        return res.status(201).send({deleteAdmin})

    }catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = rout