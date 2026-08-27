import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'

const EditDoctorProfile = () => { 

    const navigate = useNavigate()

    const [doctorData, setDoctorData] = useState({
        Specialization: '',
        Gender: '',
        Experience: '',
        Hospital: '',
        ConsultationFee: '',
        AvailableDays: [],
        AvailableFrom: '',
        AvailableTo: ''
    })


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

            const data = await response.json()

            if (response.ok) {

                setDoctorData({

                    Specialization: data.Specialization,

                    Gender: data.Gender,

                    Experience: data.Experience,

                    Hospital: data.Hospital,

                    ConsultationFee: data.ConsultationFee,

                    AvailableDays: data.AvailableDays,

                    AvailableFrom: data.AvailableFrom,

                    AvailableTo: data.AvailableTo

                })

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


    const handleChange = (e) => {

        setDoctorData({

            ...doctorData,

            [e.target.name]: e.target.value

        })

    }


    const updateProfile = async (e) => {

        e.preventDefault()

        try {

            const response = await fetch(
                "http://localhost:4000/auth/updatedoctor",
                {
                    method: "PATCH",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: localStorage.getItem("token")

                    },

                    body: JSON.stringify(doctorData)

                }
            )

            const data = await response.json()

            if (response.ok) {

                handleSuccess(data.message)

                setTimeout(() => {

                    navigate('/doctorprofile')

                }, 1000)

            } else {

                handleError(data.message)

            }

        } catch (error) {

            handleError(error.message)

        }

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

                <h1 className="text-3xl font-bold text-blue-600 mb-8">

                    Edit Doctor Profile

                </h1>


                <form
                    onSubmit={updateProfile}
                    className="space-y-5"
                >


                    <input
                        type="text"
                        name="Specialization"
                        value={doctorData.Specialization}
                        onChange={handleChange}
                        placeholder="Specialization"
                        className="w-full border p-3 rounded-xl"
                    />


                    <select
                        name="Gender"
                        value={doctorData.Gender}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>


                    <input
                        type="number"
                        name="Experience"
                        value={doctorData.Experience}
                        onChange={handleChange}
                        placeholder="Experience"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="Hospital"
                        value={doctorData.Hospital}
                        onChange={handleChange}
                        placeholder="Hospital"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="number"
                        name="ConsultationFee"
                        value={doctorData.ConsultationFee}
                        onChange={handleChange}
                        placeholder="Consultation Fee"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="AvailableFrom"
                        value={doctorData.AvailableFrom}
                        onChange={handleChange}
                        placeholder="Available From"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="AvailableTo"
                        value={doctorData.AvailableTo}
                        onChange={handleChange}
                        placeholder="Available To"
                        className="w-full border p-3 rounded-xl"
                    />


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >

                        Save Changes

                    </button>


                </form>

            </div>


            <ToastContainer />

        </div>

    )

}

export default EditDoctorProfile