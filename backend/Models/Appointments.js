const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    Doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Doctors",
        required : true
    } ,
    
    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Patients",
        required : true
    } ,

    AppointmentDate : {
        type : Date,
        required : true,
    } ,

    Reason : {
        type : String,
        required : true
    } ,

    Status : {
        type : String,
        enum : ["Pending" , "Confirmed" , "Completed" , "Cancelled"],
        default : "Pending"
    }
}, {
    timestamps : true
}
)

const AppointmentModel = mongoose.model("Appointments" , AppointmentSchema)
module.exports = AppointmentModel