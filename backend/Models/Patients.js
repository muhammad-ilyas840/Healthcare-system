const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    } ,

    Age : {
        type : Number,
        required : true,
    } ,
    Gender : {
        type : String,
        required : true,
    } ,
    Bloodgroup : {
        type : String,
        required : true
    } ,
    Address : {
        type : String,
        required : true
    }
})

const PatientModel = mongoose.model("Patients" , PatientSchema)
module.exports = PatientModel