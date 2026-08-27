const bcrypt = require('bcrypt')
const PatientModel = require('../Models/Patients')
const DoctorModel = require('../Models/Doctors')
const UserModel = require('../Models/User')
const Jwt_secret = process.env.Jwt_secret
const jwt = require('jsonwebtoken')
const AppointmentModel = require('../Models/Appointments')
const { 
    PatientValidation,
    DoctorValidation,
    loginValidation
} = require('../Middlewares/AuthValidation') 
const ReviewModel = require('../Models/Reviews')

const PatientSignup = async (req ,res)=>{
    try{
    const {
        FullName,
        Email,
        Password,
        Age,
        Gender,
        Bloodgroup,
        Address
    } = req.body;
    
    const existingUser = await UserModel.findOne({Email})
    if(existingUser){
        return res.status(409).json({message : "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await UserModel.create({
        FullName,
        Email,
        Password : hashedPassword,
        Role: "Patient"
    });

    const patient = await PatientModel.create({
        User: user._id,
        Age,
        Gender,
        Bloodgroup,
        Address
    });
    
    res.status(201).json({message : "Patient registered successfully"})


} catch(err){
    res.status(500).json({message : "Internal server error" , error : err.message})
}
    
}

const DoctorSignup = async (req ,res)=>{
    try{
    const {
        FullName,
        Email,
        Password,
        Specialization,
        Gender,
        Experience,
        Hospital,
        ConsultationFee ,
        AvailableDays,
        AvailableFrom ,
        AvailableTo
    } = req.body;
    
    const existingUser = await UserModel.findOne({Email})
    if(existingUser){
        return res.status(409).json({message : "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await UserModel.create({
        FullName,
        Email,
        Password : hashedPassword,
        Role: "Doctor"
    });

    const doctor = await DoctorModel.create({
        User: user._id,
        Specialization,
        Gender,
        Experience,
        Hospital,
        ConsultationFee,
        AvailableDays,
        AvailableFrom ,
        AvailableTo
    })
    
    res.status(201).json({message : "Doctor registered successfully"})


} catch(err){
    res.status(500).json({message : "Internal server error" , error : err.message})
}
    
}

const Login = async (req ,res)=>{
    try{
    const {Email, Password} = req.body;
    
    const user = await UserModel.findOne({Email})
    if(!user){
        return res.status(401).json({message : "There is no account to login" , success : false})
    }

    const isPassEqual = await bcrypt.compare(Password , user.Password)
    if(!isPassEqual){
        return res.status(403).json({message : "Wrong password or email" , success : false})
    }

    const token = jwt.sign(
        {Role : user.Role , id : user._id},
        Jwt_secret,
        {expiresIn : "1d"}
    )

    res.status(200).json({
        message : "Logged in successfully",
        success : true,
        token,
        FullName : user.FullName,
        Role : user.Role
    })


} catch(err){
    res.status(500).json({message : "Internal server error" , error : err.message , success : false})
}
    
}

// const updateAppointmentStatus = async (req , res)=>{
//     try{
//         const {appointmentId} = req.params
//         const {Status} = req.body

//         if(!["Confirmed" , "Cancelled" , "Completed"].includes(Status)){
//             res.status(400).json({message : "Invalid status"})
//         }

//         const doctor = await DoctorModel.findOne({User : req.user.id})
//         if(!doctor){
//             return res.status(401).json({message : "Doctor not found"})
//         }

//         const appointment = await AppointmentModel.findOne({
//             _id : appointmentId,
//             Doctor : doctor._id
//         })

//         if (!appointment) {
//             return res.status(404).json({
//                 message: "Appointment not found or does not belong to you"
//             });
//         }

//         if (appointment.Status === "Completed") {
//             return res.status(400).json({
//                 message: "Completed appointment cannot be changed"
//     });
// }

//         appointment.Status = Status
//         await appointment.save()

//         res.status(200).json({
//             message : `Appointment ${Status.toLowerCase()} successfully`,
//             appointment  
//         })

        
//     } catch(err){
//          console.error(err)

//         res.status(500).json({
//             message: "Error updating appointment status",
//             error: err.message,
//         });
//     }
// }

const updateAppointmentStatus = async (req , res)=>{
    try{
        const {appointmentId} = req.params
        const {Status} = req.body

        if(!["Confirmed" , "Cancelled" , "Completed"].includes(Status)){
            res.status(400).json({message : "Invalid status"})
        }

        const doctor = await DoctorModel.findOne({User : req.user.id})
        if(!doctor){
            return res.status(401).json({message : "Doctor not found"})
        }

        const appointment = await AppointmentModel.findOne({
            _id : appointmentId,
            Doctor : doctor._id
        })

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found or does not belong to you"
            });
        }
        
        if (appointment.Status === "Completed") {
            return res.status(400).json({
            message: "Completed appointment cannot be changed"
        });
    }

        if(Status === "Confirmed" &&
            appointment.Status !== "Pending"
        ) {
            return res.status(400).json({
            message: "Only pending appointments can be confirmed"
        })
        }

        if (
            Status === "Cancelled" &&
            !["Pending", "Confirmed"].includes(appointment.Status)
        ) {
            return res.status(400).json({
                message: "This appointment cannot be cancelled"
            });
        }
        appointment.Status = Status
        await appointment.save()

        res.status(200).json({
            message : `Appointment ${Status.toLowerCase()} successfully`,
            appointment  
        })

        
    } catch(err){
         console.error(err)

        res.status(500).json({
            message: "Error updating appointment status",
            error: err.message,
        });
    }

}

const PatientUpdateAppointment = async(req , res)=>{
    try{
    const {appointmentId} = req.params
    const {Status} = req.body

    if(!Status === "Cancelled"){
        return ses.status(403).json({message : "Patient can only cancel appointments"})
    }
    const patient = await PatientModel.findOne({
            User: req.user.id
        });

        if (!patient) {
            return res.status(401).json({
                message: "Patient not found"
            });
        }

        const appointment = await AppointmentModel.findOne({
            _id: appointmentId,
            Patient: patient._id
        });

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found or does not belong to you"
            });
        }

        if (appointment.Status === "Completed") {
            return res.status(400).json({
                message: "Completed appointment cannot be cancelled"
            });
        }

        if (appointment.Status === "Cancelled") {
            return res.status(400).json({
                message: "Appointment is already cancelled"
            });
        }

        appointment.Status = "Cancelled";

        await appointment.save();

        res.status(200).json({
            message: "Appointment cancelled successfully",
            appointment
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
        message: "Error cancelling appointment",
        error: err.message
    });
}

}

const UpdateDoctorProfile = async (req, res) => {

    try {

        const doctor = await DoctorModel.findOneAndUpdate(
            { User: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!doctor) {

            return res.status(404).json({
                message: "Doctor profile not found"
            })

        }

        res.status(200).json({

            message: "Profile updated successfully",

            doctor

        })

    } catch (err) {

        res.status(400).json({

            message: "There is a problem while updating data",

            error: err.message

        })

    }

}

const UpdatePatientProfile = async (req , res)=>{
    try {
        const patient = await PatientModel.findOneAndUpdate(
            {User : req.user.id},
            req.body,
            {new : true}
        )

        if(!patient){
            return res.status(404).json({message : "Patient not found"})
        }

        res.status(200).json({message : "Updated successfully"})
    
    } catch (err) {
        res.status(400).json({message : "There is a problem while updating data"})
    }
}

const Reviews = async (req , res)=>{
    try{
        const {Doctor , Comment , Rating} = req.body
        const patient = await PatientModel.findOne({User: req.user.id})
        if(!patient){
            return res.status(404).json({message : "Patient not found"})
        }
        const doctor = await DoctorModel.findById(Doctor)
        if(!doctor){
            return res.status(404).json({message : "Doctor not found"})
        }
        const existingReview = await ReviewModel.findOne({
            Patient : patient._id,
            Doctor : doctor._id
        })
        if(existingReview){
            return res.status(409).json({
                message : "You cannot give review because you have already given a review for this doctor"
            })
        }
        
        const review = await ReviewModel.create({
            Doctor : doctor._id,
            Patient : patient._id,
            Rating,
            Comment
        })
        res.status(201).json({message : "You review has been submitted successfully"})
    } 
    catch(err){
        res.status(400).json({message : "There was a problem while fetching doctor's data" , error:err.message})
    }
}



const SearchDoctors = async (req , res)=>{
    try{
        const page = parseInt(req.query.page) || 1 //the below 2 lines and this one is just
        const limit = parseInt(req.query.limit) || 6 // for pagination
        const skip = (page - 1) * limit//
        
        const {search} = req.query
        if (!search) {
            return res.status(400).json({
                message: "Please enter a search value"
            })
        }


        const users = await UserModel.find({
            FullName : {
                $regex : search,
                $options : "i"
            },
            Role : "Doctor"
        })

        const userIds = users.map(user=>user._id)

        const doctor = await DoctorModel.find({
            $or : [
                {
                    User : {
                        $in : userIds
                    }
                },
                {
                    Specialization : {
                    $regex : search,
                    $options : "i"
                    }
                }
            ]
        }).populate("User" , "FullName Email")
        .limit(limit).skip(skip) //this is just for pagination

        res.status(200).json(doctor)
    }
    catch(err){
        console.log("SEARCH ERROR:", err)
        res.status(500).json({message : "Internal server error" , error : err.message})
    }
}

module.exports = {
    PatientSignup,
    DoctorSignup,
    Login,
    updateAppointmentStatus,
    PatientUpdateAppointment,
    UpdateDoctorProfile,
    UpdatePatientProfile,
    Reviews,
    SearchDoctors
}