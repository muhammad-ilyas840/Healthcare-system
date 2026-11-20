import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

type DoctorHandlerProps = {
    setIsDoctor : Dispatch<SetStateAction<boolean>>
}

const DoctorHandler = ({setIsDoctor} : DoctorHandlerProps) => {
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
    }, [location , navigate , role ,  setIsDoctor])
    
  return (
    null
  )
}

export default DoctorHandler
