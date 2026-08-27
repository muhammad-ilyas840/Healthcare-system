import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '../Utils'
import { ToastContainer } from 'react-toastify'

const DoctorPublicProfile = () => {

    const navigate = useNavigate()
    const { doctorId } = useParams()

    const [profile, setProfile] = useState(null)

    const fetchData = async () => {

        try {

            const response = await fetch(
                `http://localhost:4000/auth/doctorpublic/${doctorId}`,
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

                navigate('/login', { replace: true })

                handleError(
                    "Your token has expired. Please login again."
                )

                return
            }

            const data = await response.json()

            if (response.ok) {

                setProfile(data)

            } else {

                handleError(data.message)

            }

        } catch (error) {

            handleError(error.message)

        }

    }

    useEffect(() => {

        fetchData()

    }, [doctorId])


    if (!profile) {

        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
        )

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">


                    {/* PROFILE HEADER */}

                    <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-10">

                        <div className="flex flex-col md:flex-row items-center gap-6">

                            <div className="w-32 h-32 rounded-full bg-white text-blue-600 flex items-center justify-center text-6xl font-bold shadow-lg">

                                {profile.User.FullName.charAt(0)}

                            </div>


                            <div className="text-center md:text-left">

                                <h1 className="text-4xl font-bold">

                                    Dr. {profile.User.FullName}

                                </h1>

                                <p className="text-xl mt-2">

                                    {profile.Specialization}

                                </p>

                                <p className="text-blue-100 mt-1">

                                    {profile.User.Email}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* MAIN INFORMATION */}

                    <div className="p-8">


                        {/* PROFESSIONAL INFORMATION */}

                        <h2 className="text-3xl font-bold text-gray-800 mb-6">

                            Professional Information

                        </h2>


                        <div className="grid md:grid-cols-2 gap-6">


                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">

                                <p className="text-gray-500">

                                    Specialization

                                </p>

                                <p className="text-xl font-bold mt-2">

                                    {profile.Specialization}

                                </p>

                            </div>


                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">

                                <p className="text-gray-500">

                                    Experience

                                </p>

                                <p className="text-xl font-bold mt-2">

                                    {profile.Experience} Years

                                </p>

                            </div>


                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">

                                <p className="text-gray-500">

                                    Gender

                                </p>

                                <p className="text-xl font-bold mt-2">

                                    {profile.Gender}

                                </p>

                            </div>


                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">

                                <p className="text-gray-500">

                                    Hospital

                                </p>

                                <p className="text-xl font-bold mt-2">

                                    {profile.Hospital}

                                </p>

                            </div>


                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">

                                <p className="text-gray-500">

                                    Consultation Fee

                                </p>

                                <p className="text-xl font-bold mt-2">

                                    Rs. {profile.ConsultationFee}

                                </p>

                            </div>


                        </div>


                        {/* AVAILABLE DAYS */}

                        <div className="mt-10">

                            <h2 className="text-3xl font-bold text-gray-800 mb-5">

                                Available Days

                            </h2>


                            <div className="flex flex-wrap gap-3">

                                {profile.AvailableDays.map((day) => (

                                    <span

                                        key={day}

                                        className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-semibold"

                                    >

                                        {day}

                                    </span>

                                ))}

                            </div>

                        </div>


                        {/* AVAILABLE TIME */}

                        <div className="mt-10">

                            <h2 className="text-3xl font-bold text-gray-800 mb-5">

                                Consultation Hours

                            </h2>


                            <div className="grid md:grid-cols-2 gap-6">


                                <div className="bg-green-50 p-6 rounded-2xl">

                                    <p className="text-gray-500">

                                        Available From

                                    </p>

                                    <p className="text-2xl font-bold text-green-700 mt-2">

                                        {profile.AvailableFrom}

                                    </p>

                                </div>


                                <div className="bg-green-50 p-6 rounded-2xl">

                                    <p className="text-gray-500">

                                        Available To

                                    </p>

                                    <p className="text-2xl font-bold text-green-700 mt-2">

                                        {profile.AvailableTo}

                                    </p>

                                </div>


                            </div>

                        </div>


                        {/* BOOK APPOINTMENT BUTTON */}

                        <div className="mt-10">

                            <button

                                onClick={() => {

                                    navigate(`/bookappointment/${profile._id}`)

                                }}

                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold transition"

                            >

                                Book Appointment

                            </button>

                        </div>


                    </div>
                    <button
                    onClick={() => navigate(`/reviews/${profile._id}`)}
                    className="mb-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >Give your review
                    </button>

                    <button
                    onClick={() => navigate(`/doctorreview/${profile._id}`)}
                    className="mb-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >See reviews
                    </button>
                </div>
            
            </div>


            <ToastContainer />

        </div>

    )

}

export default DoctorPublicProfile