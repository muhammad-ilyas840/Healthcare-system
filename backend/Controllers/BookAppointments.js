const { AppointmentValidation } = require('../Middlewares/AuthValidation')
const AppointmentModel = require('../Models/Appointments')
const DoctorModel = require('../Models/Doctors')
const PatientModel = require('../Models/Patients')

const Appointments = async (req ,res)=>{
    try{
        const {Doctor , AppointmentDate , Reason , Status} = req.body

        const loggedUser = req.user.id 
        if(!loggedUser){
            return res.status(403).json({message : "Unauthorized || Cannot book appointment"})
        }

        const patient = await PatientModel.findOne({User : loggedUser})
        if(!patient){
            return res.status(404).json({message : "Patient not found"})
        }
        
        const doctor = await DoctorModel.findById(Doctor)
        if(!doctor){
            res.status(401).json({message : "There is no doctor for appointment"})
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

module.exports = Appointments