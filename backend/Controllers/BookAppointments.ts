import type { Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import AppointmentModel from '../Models/Appointments'
import DoctorModel from '../Models/Doctors'
import PatientModel from '../Models/Patients'

interface AuthRequest extends Request {
    user?: string | JwtPayload
}

const Appointments = async (req : AuthRequest ,res : Response)=>{
    try{
        const {Doctor , AppointmentDate , Reason , Status} = req.body

        if(!req.user || typeof req.user === "string" || !("id" in req.user)){
            return res.status(401).json({
                message: "User not authorized"
            })
        }

        const patient = await PatientModel.findOne({User : req.user.id})
        if(!patient){
            return res.status(404).json({message : "Patient not found"})
        }
        
        const doctor = await DoctorModel.findById(Doctor)
        if(!doctor){
            return res.status(401).json({message : "There is no doctor for appointment"})
        }
        const existingAppointment = await AppointmentModel.findOne({
            Doctor : doctor._id,
            AppointmentDate 
        })
        if(existingAppointment){
            return res.status(409).json({message : "Doctor has already an appointment at this time"})
        }

        const bookAppointment = await AppointmentModel.create({
            Doctor : doctor._id , Patient : patient._id, AppointmentDate , Reason , Status
        })
        res.status(201).json({message : "Appointment booked successfully"})
    } 
    catch(err){
        res.status(400).json({message : "Something went wrong during appointment"})
    }
}

export default Appointments