import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../Utils'

const DoctorProfile = () => {

    const navigate = useNavigate()

    const [doctor, setDoctor] = useState(null)

    const fetchDoctorProfile = async () => {

        try {

            const response = await fetch(
                "http://localhost:4000/auth/doctorprofile",
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            if (response.status === 403) {

                localStorage.removeItem("token")
                localStorage.removeItem("loggedInUser")
                localStorage.removeItem("Role")

                navigate("/login", {
                    replace: true
                })

                handleError(
                    "Your token has expired. Please login again."
                )

                return
            }

            const data = await response.json()
            console.log("DOCTOR PROFILE DATA:", data)

            if (response.ok) {

                setDoctor(data)

            } else {

                handleError(data.message)

            }

        } catch (error) {

            handleError(error.message)

        }

    }

    useEffect(() => {

        fetchDoctorProfile()

    }, [])

    if (!doctor) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>

        )

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* PROFILE HEADER */}

                    <div className="bg-linear-to-r from-green-600 to-emerald-500 text-white p-10">

                        <div className="flex items-center gap-6">

                            <div className="w-28 h-28 rounded-full bg-white text-green-600 flex items-center justify-center text-5xl font-bold">

                                {doctor.User.FullName.charAt(0)}

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold">

                                    Dr. {doctor.User.FullName}

                                </h1>

                                <p className="text-lg mt-2">

                                    {doctor.Specialization}

                                </p>

                                <p className="text-green-100">

                                    {doctor.User.Email}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* DOCTOR INFORMATION */}

                    <div className="p-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">

                            Professional Information

                        </h2>


                        <div className="grid md:grid-cols-2 gap-6">


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Specialization
                                </p>

                                <p className="text-xl font-semibold">
                                    {doctor.Specialization}
                                </p>

                            </div>


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Experience
                                </p>

                                <p className="text-xl font-semibold">
                                    {doctor.Experience} Years
                                </p>

                            </div>


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Gender
                                </p>

                                <p className="text-xl font-semibold">
                                    {doctor.Gender}
                                </p>

                            </div>


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Hospital
                                </p>

                                <p className="text-xl font-semibold">
                                    {doctor.Hospital}
                                </p>

                            </div>


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Consultation Fee
                                </p>

                                <p className="text-xl font-semibold">
                                    ${doctor.ConsultationFee}
                                </p>

                            </div>


                            <div className="bg-gray-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Available Days
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">

                                    {doctor.AvailableDays.map((day) => (

                                        <span
                                            key={day}
                                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"
                                        >

                                            {day}

                                        </span>

                                    ))}

                                </div>

                            </div>

                        </div>


                        {/* AVAILABLE TIME */}

                        <div className="mt-8">

                            <h2 className="text-2xl font-bold text-gray-800 mb-4">

                                Availability Time

                            </h2>


                            <div className="bg-green-50 rounded-2xl p-6 flex justify-between">

                                <div>

                                    <p className="text-gray-500">
                                        Available From
                                    </p>

                                    <p className="text-xl font-bold text-green-700">
                                        {doctor.AvailableFrom}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-gray-500">
                                        Available To
                                    </p>

                                    <p className="text-xl font-bold text-green-700">
                                        {doctor.AvailableTo}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ACCOUNT INFORMATION */}

                        <div className="mt-8">

                            <h2 className="text-2xl font-bold text-gray-800 mb-4">

                                Account Information

                            </h2>


                            <div className="bg-gray-50 p-6 rounded-2xl">

                                <div className="flex justify-between mb-3">

                                    <span className="text-gray-500">
                                        Full Name
                                    </span>

                                    <span className="font-semibold">
                                        {doctor.User.FullName}
                                    </span>

                                </div>


                                <div className="flex justify-between mb-3">

                                    <span className="text-gray-500">
                                        Email
                                    </span>

                                    <span className="font-semibold">
                                        {doctor.User.Email}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button
                    onClick={() => navigate('/editdoctor')}
                    className="mb-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >Edit Profile
                    </button>

                    <button
                    onClick={() => navigate('/doctorreview')}
                    className="mb-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >Check reviews
                    </button>

                </div>

            </div>

            <ToastContainer />

        </div>

    )

}

export default DoctorProfile
