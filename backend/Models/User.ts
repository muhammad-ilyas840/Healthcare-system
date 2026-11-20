import mongoose from 'mongoose'

type UserData = {
    FullName : string,
    Email : string,
    Password : string,
    Role : "Doctor" | "Patient"
}

const UserSchema = new mongoose.Schema<UserData>({
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
export default UserModel