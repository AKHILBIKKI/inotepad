const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/inotebook'

const connectToMango = async () => {
    mongoose.connect(mongoUrl, ()=>{
        console.log("connected to mango succesfully");
    })
}

module.exports = connectToMango;    