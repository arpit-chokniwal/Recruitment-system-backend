const express = require('express')
const cors = require('cors')
const app = express()
const connect = require('./configs/db')


app.use(cors())
app.use(express.json())

const admin = require('./controller/admin.ctrl')
app.use('/admin',admin)

const job = require('./controller/job.ctrl')
app.use('/job',job)

const user = require('./controller/use.ctrl')
app.use('/user',user)


const Port = 2345 
app.listen(Port, async()=>{
    try{
        await connect()
        console.log(`Listen at port ${Port}`);
    }catch(e){
        console.log(e)        
    }
})