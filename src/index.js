const express = require('express')
const cors = require('cors')
const app = express()
const connect = require('./configs/db')


app.use(cors())
app.use(express.json())


const Port = 2345 
app.listen(Port, async()=>{
    try{
        console.log(1232)
        await connect()
        console.log(`Listen at port ${Port}`);
    }catch(e){
        console.log(e)        
    }
})