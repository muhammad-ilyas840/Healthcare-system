const { PatientSignup, DoctorSignup, Login, updateAppointmentStatus, UpdateDoctorProfile, 
    UpdatePatientProfile, Reviews, SearchDoctors, 
    PatientUpdateAppointment} = require('../Controllers/AuthContoller')

const CreateCheckoutSession = require('../Controllers/PaymentController')
const { PatientValidation,
        DoctorValidation,
        loginValidation 
    }
    = require('../Middlewares/AuthValidation')

    const ensureAuthenticated  = require('../Middlewares/Auth')

const { isPatient, isDoctor } = require('../Middlewares/RoleAuth')
const { DoctorsList , PatientAppointments , DoctorAppointments, AppointmentsByDate, DoctorProfile,
     DoctorPublicProfile, 
     PatientProfile,
     GetDoctorReviews,
     GetDoctorPublicReviews} = require('../Controllers/GetAuth')

const Appointments = require('../Controllers/BookAppointments')

const router = require('express').Router()

router.post('/patient' , PatientValidation , PatientSignup)

router.post('/doctor' , DoctorValidation , DoctorSignup)

router.post('/login' , loginValidation , Login)

router.post('/appointment' , ensureAuthenticated , isPatient , Appointments)
router.post('/submitreview' , ensureAuthenticated , isPatient , Reviews)
router.post('/create-checkout-session/:appointmentId' , ensureAuthenticated , isPatient , CreateCheckoutSession)

router.get('/doctorslist', ensureAuthenticated , isPatient, DoctorsList)

router.get('/patientappointments' , ensureAuthenticated , isPatient , PatientAppointments )
router.get('/doctorappointments' , ensureAuthenticated , isDoctor , DoctorAppointments )
router.get('/appointmentdates' , ensureAuthenticated , isDoctor , AppointmentsByDate)
router.get('/doctorprofile' , ensureAuthenticated , isDoctor , DoctorProfile )
router.get('/doctorpublic/:doctorId' , ensureAuthenticated , isPatient , DoctorPublicProfile)
router.get('/patientprofile' , ensureAuthenticated , isPatient , PatientProfile)
router.get('/doctorreview' , ensureAuthenticated , isDoctor , GetDoctorReviews)
router.get('/doctorpublicreviews/:doctorId' , ensureAuthenticated , isPatient , GetDoctorPublicReviews)
router.get('/searchev' , ensureAuthenticated , isPatient , SearchDoctors)

router.patch('/appointment/:appointmentId' , ensureAuthenticated , isDoctor , updateAppointmentStatus)
router.patch('/patientappointmentupdate/:appointmentId' , ensureAuthenticated , isPatient , PatientUpdateAppointment)
router.patch('/updatedoctor' , ensureAuthenticated , isDoctor , UpdateDoctorProfile)
router.patch('/updatepatient' , ensureAuthenticated , isPatient , UpdatePatientProfile)


module.exports = router