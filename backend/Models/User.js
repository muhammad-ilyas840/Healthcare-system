const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FullName : {
        type : String,
        required : true,
    } ,
    Email : {
        type : String,
        required : true,
        unique : true
    } ,
    Password : {
        type : String,
        required : true
    } ,
    Role : {
        type : String,
        enum : ["Doctor" , "Patient"],
        required : true
    }
})

const UserModel = mongoose.model("Users" , UserSchema)
module.exports = UserModel