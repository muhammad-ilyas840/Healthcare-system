const mongoose = require('mongoose')
const Mongo_Url = process.env.Mongo_Url

mongoose.connect(Mongo_Url) .then(()=>{
    console.log("Mongodb conncected successfully")
}) .catch((err)=>{
    console.log("Connection error" , err)
})