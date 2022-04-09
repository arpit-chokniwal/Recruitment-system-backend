const mongoose = require('mongoose')


module.exports = () =>{
    return mongoose.connect("mongodb+srv://mern:mern@cluster0.frc8c.mongodb.net/MERN")
}


