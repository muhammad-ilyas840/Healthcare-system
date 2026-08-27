import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const PatientHandler = ({setIsPatient}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const role = localStorage.getItem("Role")

    useEffect(() => {
        if(localStorage.getItem("token") && role === 'Patient'){
            setIsPatient(true)
            if(
                location.pathname === '/' ||
                location.pathname === '/patient-signup' ||
                location.pathname === '/login' ||
                location.pathname === '/doctordashboard'||
                location.pathname === '/doctor-signup' ||
                location.pathname === '/doctorappointments' ||
                location.pathname === '/doctorprofile' ||
                location.pathname === '/editdoctor' ||
                location.pathname === '/doctorreview'
            ) {
                navigate('/patientdashboard', {replace: false})
            }
        }
    }, [location , navigate , setIsPatient])
    
  return (
    null
  )
}

export default PatientHandler
