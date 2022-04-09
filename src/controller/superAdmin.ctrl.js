const express = require('express')
const rout = express.Router()


rout.post('/',async(req,res)=>{
    try{

    }catch(e){
        res.status(400).send(e)
    }
})


rout.get('/',async(req,res)=>{
    try{

    }catch(e){
        res.status(400).send(e)
    }
})


rout.patch('/:id',async(req,res)=>{
    try{

    }catch(e){
        res.status(400).send(e)
    }
})



rout.delete('/:id',async(req,res)=>{
    try{

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = rout