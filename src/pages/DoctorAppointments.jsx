import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate()

    const getAppointments = async () => {
        const headers = {
            headers: { 'Authorization': localStorage.getItem('token') }
        }
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/doctorappointments`, headers)
            if (response.status === 403) {
                localStorage.removeItem('token')
                localStorage.removeItem("loggedInUser")
                localStorage.removeItem('Role')
                navigate("/login", { replace: true });
                handleError("You token has expired so please login again")
                return;
            }
            let data = await response.json()
            if (response.ok) {
                setAppointments(data)
            }
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const updateAppointmentStatus = async (appointmentId, status) => {
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/appointment/${appointmentId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    Status: status
                })
            })
            if (response.status === 403) {
                localStorage.removeItem("token")
                localStorage.removeItem("loggedInUser")
                localStorage.removeItem("Role")
                navigate('/login')
                return;
            }

            let data = await response.json()
            if (response.ok) {
                handleSuccess(data.message)
            }
            else {
                handleError(data.message)
            }
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div className='min-h-screen'>

            <div className='flex flex-col items-center mt-10 space-y-4'>
                <h1 className='font-bold text-5xl text-blue-600'>My Appointments</h1>
                <h1 className='text-xl font-semibold text-blue-600'>View all your booked appointments</h1>
            </div>

            <div className='grid grid-cols-3 space-x-5 ml-5 mt-5'>

                {
                    appointments.map((item) => (
                        <div key={item._id} className="bg-white hover:translate-x-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 w-95">
                            <div className='flex flex-col text-center bg-red-500 rounded-t-3xl h-50 pt-12'>
                                <h1 className='text-3xl font-semibold w-20 h-20 bg-white text-red-600 
                        rounded-full flex items-center justify-center mx-auto'>{item.Patient.User.FullName.charAt(0)}</h1>
                                <h1 className='text-2xl font-semibold'>{item.Patient.User.FullName}</h1>
                            </div>

                            <div className='flex flex-col justify-between p-2 '>
                                <p className=' font-semibold pb-3'>Reason</p>
                                <p className=' bg-gray-200 rounded-lg p-3'>{item.Reason}</p>
                            </div>

                            <div className='flex flex-row justify-between p-2 '>
                                <h1 className=' font-semibold'>Patient Gender</h1>
                                <h1 className=' font-semibold'>{item.Patient.Gender}</h1>
                            </div>

                            <div className='flex flex-row justify-between p-2 '>
                                <p className=' font-semibold'>Appointment date</p>
                                <p className=' font-semibold'>{new Date(item.AppointmentDate).toLocaleDateString()}</p>
                            </div>

                            <div className='flex flex-row justify-between p-2 '>
                                <p className=' font-semibold'>Apointment status</p>
                                <p className=' font-semibold'>{item.Status}</p>
                            </div>

                            {item.Status === "Pending" && (
                                <div className="flex gap-3 p-4 border-t border-gray-200">

                                    <button
                                        onClick={() =>
                                            updateAppointmentStatus(item._id, "Confirmed")
                                        }
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                                    >
                                        Approve
                                    </button>

                                    <button onClick={() => updateAppointmentStatus(item._id, "Cancelled")}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                                    >
                                        Reject
                                    </button>

                                </div>
                            )}

                            {item.Status === "Confirmed" && (
                                <div className="flex gap-3 p-4 border-t border-gray-200">

                                    <button
                                        onClick={() =>
                                            updateAppointmentStatus(item._id, "Completed")
                                        }
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                                    >
                                        Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                }

            </div>

            <ToastContainer />
        </div>
    )
}

export default DoctorAppointments
