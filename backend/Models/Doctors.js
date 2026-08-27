const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    } ,

    Specialization: {
        type : String,
        required : true,
    } ,
    Gender : {
        type : String,
        required : true,
    } ,
    Experience : {
        type : Number,
        required : true
    } ,
    Hospital : {
        type : String,
        required : true
    } ,
    ConsultationFee : {
        type : Number,
        required : true
    } ,
    AvailableDays: {
        type: [String],
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    } ,

    AvailableFrom: {
        type: String
    } ,

    AvailableTo: {
        type: String
    }
})

const DoctorModel = mongoose.model("Doctors" , DoctorSchema)
module.exports = DoctorModel