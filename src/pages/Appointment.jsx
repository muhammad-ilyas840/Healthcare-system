import React from 'react'
import { handleError, handleSuccess } from '../Utils'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Appointment = () => {
    const { doctorId } = useParams()

    const [appointmentData, setAppointmentData] = useState({
        AppointmentDate: '',
        Reason: '',
    })
    const bookAppointment = async (e) => {
        e.preventDefault()
        const { AppointmentDate, Reason } = appointmentData
        if (!AppointmentDate || !Reason) {
            return handleError("Every field must be filled")
        }
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/appointment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({
                    Doctor: doctorId,
                    AppointmentDate: appointmentData.AppointmentDate,
                    Reason: appointmentData.Reason
                })
            })
            let data = await response.json()
            if (response.ok) {
                handleSuccess(data.message)
            } else {
                handleError(data.message)
            }
        } catch (err) {
            handleError(err)
        }

    }
    const handlechange = (e) => {
        setAppointmentData({
            ...appointmentData, [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <form
                    onSubmit={bookAppointment}
                    className="flex flex-col bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <h1 className="text-2xl font-bold bg-blue-600 text-white py-6 px-8 text-center">
                        Book your appointment
                    </h1>

                    <div className="p-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="AppointmentDate" className="text-sm font-medium text-gray-700">
                                Appointment Date
                            </label>
                            <input
                                type="datetime-local"
                                name="AppointmentDate"
                                id="AppointmentDate"
                                value={appointmentData.AppointmentDate}
                                onChange={handlechange}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="Reason" className="text-sm font-medium text-gray-700">
                                Reason
                            </label>
                            <input
                                type="text"
                                name="Reason"
                                id="Reason"
                                placeholder="Enter reason for visit"
                                value={appointmentData.Reason}
                                onChange={handlechange}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <button
                            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-xl font-bold shadow-md transition duration-200"
                            type="submit"
                        >
                            Book Appointment
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Appointment
