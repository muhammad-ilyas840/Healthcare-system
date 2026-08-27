const { number } = require("joi")
const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    Doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Doctors",
        required : true
    },
    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Patients",
        required : true
    },
    Rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    Comment : {
        type : String,
        required : true
    } ,

} , {timestamps : true})

const ReviewModel = mongoose.model("Reviews" , ReviewSchema)
module.exports = ReviewModel