
import { Router } from 'express'

import dbConnect from '../Models/db'

import {
    PatientSignup,
    DoctorSignup,
    Login,
    updateAppointmentStatus,
    UpdateDoctorProfile,
    UpdatePatientProfile,
    Reviews,
    SearchDoctors,
    PatientUpdateAppointment
} from '../Controllers/AuthContoller'

import CreateCheckoutSession from '../Controllers/PaymentController'

import {
    PatientValidation,
    DoctorValidation,
    loginValidation
} from '../Middlewares/AuthValidation'

import ensureAuthenticated from '../Middlewares/Auth'

import { isPatient, isDoctor } from '../Middlewares/RoleAuth'

import {
    DoctorsList,
    PatientAppointments,
    DoctorAppointments,
    AppointmentsByDate,
    DoctorProfile,
    DoctorPublicProfile,
    PatientProfile,
    GetDoctorReviews,
    GetDoctorPublicReviews
} from '../Controllers/GetAuth'

import Appointments from '../Controllers/BookAppointments'

const router = Router()

router.use(async (req, res, next) => {
    try {
        await dbConnect()
        next()
    } catch (error) {
        console.error('Database connection failed:', error)

        res.status(500).json({
            message: 'Database connection failed'
        })
    }
})

router.post('/patient', PatientValidation, PatientSignup)

router.post('/doctor', DoctorValidation, DoctorSignup)

router.post('/login', loginValidation, Login)

router.post('/appointment', ensureAuthenticated, isPatient, Appointments)

router.post('/submitreview', ensureAuthenticated, isPatient, Reviews)

router.post('/create-checkout-session/:appointmentId', ensureAuthenticated, isPatient, CreateCheckoutSession)

router.get('/doctorslist', ensureAuthenticated, isPatient, DoctorsList)

router.get('/patientappointments', ensureAuthenticated, isPatient, PatientAppointments)

router.get('/doctorappointments', ensureAuthenticated, isDoctor, DoctorAppointments)

router.get('/appointmentdates', ensureAuthenticated, isDoctor, AppointmentsByDate)

router.get('/doctorprofile', ensureAuthenticated, isDoctor, DoctorProfile)

router.get('/doctorpublic/:doctorId', ensureAuthenticated, isPatient, DoctorPublicProfile)

router.get('/patientprofile', ensureAuthenticated, isPatient, PatientProfile)

router.get('/doctorreview', ensureAuthenticated, isDoctor, GetDoctorReviews)

router.get('/doctorpublicreviews/:doctorId', ensureAuthenticated, isPatient, GetDoctorPublicReviews)

router.get('/searchev', ensureAuthenticated, isPatient, SearchDoctors)

router.patch('/appointment/:appointmentId', ensureAuthenticated, isDoctor, updateAppointmentStatus)

router.patch('/patientappointmentupdate/:appointmentId', ensureAuthenticated, isPatient, PatientUpdateAppointment)

router.patch('/updatedoctor', ensureAuthenticated, isDoctor, UpdateDoctorProfile)

router.patch('/updatepatient', ensureAuthenticated, isPatient, UpdatePatientProfile)

export default router