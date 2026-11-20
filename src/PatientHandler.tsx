import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

type PatientHandlerProps = {
    setIsPatient : Dispatch<SetStateAction<boolean>>
}

const PatientHandler = ({setIsPatient} : PatientHandlerProps) => {
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
