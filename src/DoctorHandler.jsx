import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DoctorHandler = ({setIsDoctor}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const role = localStorage.getItem("Role")

    useEffect(() => {
        if(localStorage.getItem("token") && role === 'Doctor'){
            setIsDoctor(true)
            if(
                location.pathname === '/' ||
                location.pathname === '/patient-signup' ||
                location.pathname === '/login' ||
                location.pathname === '/patientdashboard'||
                location.pathname === '/doctor-signup' ||
                location.pathname === '/bookappointment/:doctorId' ||
                location.pathname === '/patientappointments' ||
                location.pathname === '/patientprofile' ||
                location.pathname === '/editpatient' ||
                location.pathname === '/reviews' ||
                location.pathname === '/doctorreview/:doctorId'
            ) {
                navigate('/doctordashboard', {replace: false})
            }
        }
    }, [location , navigate , setIsDoctor])
    
  return (
    null
  )
}

export default DoctorHandler
