import { Request, Response } from "express"
import  AppointmentModel from "../Models/Appointments"
import DoctorModel from "../Models/Doctors"
import PatientModel from "../Models/Patients"
import ReviewModel from "../Models/Reviews"
import type { JwtPayload } from "jsonwebtoken"

interface AuthRequest extends Request{
    user? : string | JwtPayload
}

const PatientAppointments = async (req : AuthRequest , res : Response )=>{
    try{
        if(!req.user || typeof req.user ==="string" || typeof req.user.id !== "string"){
            return res.status(401).json({
                message: 'User not authorized'
            })
        }
        const patient = await PatientModel.findOne({User : req.user.id})
        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            })
        }

        const patientData = await AppointmentModel.find({Patient : patient._id})
        .populate({
            path : "Doctor",
            populate: {
                path : "User"
            }
        })
        res.status(200).json(patientData)
    } catch(err : unknown){
         res.status(400).json({message : "There is an error while showing your record",
        error: err instanceof Error ? err.message : "An unexpected error occured"})
    }
}

const DoctorsList = async (req : Request , res : Response)=>{
    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 6
        const skip = (page - 1) * limit

        const totalDoctors = await DoctorModel.countDocuments()
        const totalPages = Math.ceil(totalDoctors/limit)

        const doctors = await DoctorModel.find().populate("User" , "FullName Email")
        .skip(skip).limit(limit)
        res.status(200).json({
            doctors,
            currentPage : page,
            totalPages,
            totalDoctors
        })
    }
    catch(err : unknown){
        res.status(400).json({message : "There is an error while showing doctor's list",
            error : err instanceof Error ? err.message : "An unexpected error occured"
        })
    }
}

const DoctorAppointments = async (req : AuthRequest , res : Response)=>{
    try{
        if(!req.user || typeof req.user ==="string" || typeof req.user.id !== "string"){
            return res.status(401).json({
                message: 'User not authorized'
            })
        }

        const doctor = await DoctorModel.findOne({User : req.user.id})
        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            })
        }

        const doctorAppointments = await AppointmentModel.find({Doctor : doctor._id })
        .populate({
            path : "Patient",
            populate: {
                path : "User"
            }
        })
        res.status(200).json(doctorAppointments)
    } catch(err : unknown){
         res.status(400).json({message : "There is an error while showing your record",
        error: err instanceof Error ? err.message : "An unexpected error occured"})
    }
}

const AppointmentsByDate = async (req : AuthRequest , res : Response)=>{
    try {
        if(!req.user || typeof req.user ==="string" || typeof req.user.id !== "string"){
            return res.status(401).json({
                message: 'User not authorized'
            })
        }

        const doctor = await DoctorModel.findOne({User : req.user.id})
        if(!doctor){
            return res.status(404).json({message : "Doctor not found"})
        }

        const appointments = await AppointmentModel.find({Doctor: doctor._id})

        const today = new Date()
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        )
        console.log("START OF TODAY:", startOfDay)

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() +1,
        )
        console.log("END OF TODAY:", endOfDay)

        const startOfYesterday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() -1
        )

        const todayAppointments = appointments.filter((appointment)=>{
            return(
                appointment.AppointmentDate >= startOfDay &&
                appointment.AppointmentDate < endOfDay
            )
        })

        const yesterdayAppointments = appointments.filter((appointment)=>{
            return(
                appointment.AppointmentDate >= startOfYesterday &&
                appointment.AppointmentDate < startOfDay
            )
        })

        const previousAppointments = appointments.filter((appointment) => {
            return appointment.AppointmentDate < startOfDay
        })

        const pendingAppointments = appointments.filter(
            appointment => appointment.Status === "Pending"
        )

        const confirmedAppointments = appointments.filter(
            appointment => appointment.Status === "Confirmed"
        )

        const completedAppointments = appointments.filter(
            appointment => appointment.Status === "Completed"
        )

        const cancelledAppointments = appointments.filter(
            appointment => appointment.Status === "Cancelled"
        )

        res.status(200).json({
            yesterdayAppointments : yesterdayAppointments.length,
            previousAppointments : previousAppointments.length,
            todayAppointments: todayAppointments.length,
            pendingAppointments: pendingAppointments.length,
            confirmedAppointments: confirmedAppointments.length,
            completedAppointments: completedAppointments.length,
            cancelledAppointments: cancelledAppointments.length,
            totalAppointments: appointments.length
        })
    } catch (err : unknown) {
        res.status(500).json({
            message: "Error while getting appointment statistics",
            error: err instanceof Error ? err.message : "An unexpected error occured"
        })
    }
}

const DoctorProfile = async (req : AuthRequest, res : Response) => {
    try {
        if(!req.user || typeof req.user === "string" || typeof req.user.id !=="string"){
            return res.status(401).json({
                message : "User not authorized"
            })
        }

        const doctor = await DoctorModel
            .findOne({ User: req.user.id })
            .populate("User", "FullName Email")

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor profile not found"
            })
        }

        res.status(200).json(doctor)

    } catch (err : unknown) {

        res.status(500).json({
            message: "Error while fetching doctor profile",
            error: err instanceof Error ? err.message : "An unexpected error occured"
        })

    }
}

const DoctorPublicProfile = async (req : Request , res : Response)=>{
    try{
        let {doctorId} = req.params
        const doctor = await DoctorModel.findById(doctorId).populate("User" , "FullName Email")

        if(!doctor){
           return res.status(404).json({message : "Doctor not found "})
        }

        res.status(200).json(doctor)

}  catch(err : unknown){
    res.status(500).json({
            message: "Error while fetching doctor profile",
            error: err instanceof Error ?  err.message : "An unexpected error occured"
        })
}
}

const PatientProfile = async (req : AuthRequest , res : Response)=>{
    try{
        if(!req.user || typeof req.user === "string" || typeof req.user.id !=="string"){
            return res.status(401).json({
                message : "User not authorized"
            })
        }

        const patient = await PatientModel.findOne({User : req.user.id}).populate("User" , "FullName Email Password")
        if(!patient){
            return res.status(404).json({message : "Patient not found"})
        }
        res.status(200).json(patient)
    }
    catch(err : unknown){
        res.status(500).json({message : "Error while fetching data",
            error : err instanceof Error ? err.message : "An unexpected error occured"
    })
    }

}

const GetDoctorReviews = async (req : AuthRequest , res : Response)=>{

    try {
        if(!req.user || typeof req.user === "string" || typeof req.user.id !=="string"){
            return res.status(401).json({
                message : "User not authorized"
            })
        }

        const doctor = await DoctorModel.findOne({User : req.user.id})
        if(!doctor){
        return res.status(404).json({message : "Doctor not found"})
    }
        const getReview = await ReviewModel.find({Doctor : doctor._id}).populate({
            path : "Patient",
            populate : {
                path : "User"
            }
        })
        res.status(200).json(getReview)

    } catch (err) {
        res.status(400).json({message : "Error while displaying reviews",
            error : err instanceof Error ? err.message : "An unexpected error occured"
        })
    }
}

const GetDoctorPublicReviews = async (req : Request , res : Response)=>{

    try {
        const {doctorId}  = req.params
        let doctor = await DoctorModel.findById(doctorId)
        if(!doctor){
        return res.status(404).json({message : "Doctor not found"})
    }
        let getReview = await ReviewModel.find({Doctor : doctor._id}).populate({
            path : "Patient",
            populate : {
                path : "User"
            }
        })
        res.status(200).json(getReview)

    } catch (err : unknown) {
        res.status(400).json({message : "Error while displaying reviews",
            error : err instanceof Error ? err.message : "An unexpected error occured"
        })
    }
}




export {
    PatientAppointments,
    DoctorsList,
    DoctorAppointments,
    AppointmentsByDate,
    DoctorProfile,
    DoctorPublicProfile,
    PatientProfile,
    GetDoctorReviews,
    GetDoctorPublicReviews
}