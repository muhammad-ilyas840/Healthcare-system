import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'
import { Navigate } from 'react-router-dom'

const PatientDashboard = () => {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [totalPages, setTotalPages] = useState('')
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate('/login')
        }, 1000);
        handleSuccess("You have logged out")
    }

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const fetchDoctors = async (page = 1) => {
        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        try {
            const limit = 6
            let response = await fetch(`http://localhost:4000/auth/doctorslist?page=${page}&limit=${limit}`, headers)
            if (response.status === 403) {
                localStorage.removeItem("token")
                localStorage.removeItem("loggedInUser")
                localStorage.removeItem("Role")
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
                return;
            }
            let data = await response.json()
            if (response.ok) {
                setDoctors(data.doctors)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
            }
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchDoctors(1)
    }, [])

    const navigateToPatientapp = () => {
        setTimeout(() => {
            navigate('/patientappointments')
        }, 1000);
    }

    const searchDoctors = async () => {
        if (!search) {
            return handleError("Please enter a specialization")
        }
        try {
            const response = await fetch(`http://localhost:4000/auth/searchev?search=${search}&page=1&limit=6`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            let data = await response.json()
            if (response.ok) {
                handleSuccess(data.message)
                setDoctors(data)
            } else {
                handleError(data.message)
            }
        } catch (err) {
            handleError(err.message)
        }
    }

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-linear-to-r from-blue-700 to-indigo-800 border-b border-blue-800 sticky top-0 z-50 px-6 py-4 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Left Side Brand Title */}
                    <div className="text-2xl font-extrabold text-white tracking-wide w-full md:w-auto text-center md:text-left">
                        Patient Dashboard
                    </div>

                    {/* Center Search Section */}
                    <div className="flex gap-2 w-full md:w-auto justify-center">
                        <input
                            type="text"
                            placeholder="Search by specialization"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-white/20 bg-white p-2 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={searchDoctors}
                            className="bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shrink-0 shadow-sm"
                        >
                            Search
                        </button>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                        <button
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 py-2 text-sm font-semibold transition backdrop-blur-sm"
                            onClick={navigateToPatientapp}
                        >
                            Appointments
                        </button>
                        <button
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 py-2 text-sm font-semibold transition backdrop-blur-sm"
                            onClick={() => { navigate('/patientprofile') }}
                        >
                            View Profile
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 text-sm font-semibold transition shadow-md shadow-red-900/20"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <h1 className='font-bold text-center mt-8 text-3xl text-gray-800'>Welcome, {loggedInUser}</h1>
            
            <div className="max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Available Doctors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition duration-300" >
                            <div className="flex justify-center mb-5">
                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
                                    {item.User.FullName.charAt(0)}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-gray-800"> Dr. {item.User.FullName} </h2>
                            <p className="text-center text-gray-500 mb-5"> {item.User.Email} </p>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Specialization</span>
                                    <span>{item.Specialization}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Gender</span>
                                    <span>{item.Gender}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Experience</span>
                                    <span>{item.Experience} Years</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Hospital</span>
                                    <span>{item.Hospital}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Consultation Fee</span>
                                    <span className="text-green-600 font-bold"> Rs. {item.ConsultationFee} </span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition" onClick={() => { navigate(`/bookappointment/${item._id}`) }} > Book Appointment </button>
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition" onClick={() => { console.log(item._id); navigate(`/doctorpublicprofile/${item._id}`) }} > See doctor details </button>
                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button onClick={() => fetchDoctors(currentPage - 1)} disabled={currentPage === 1} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400" > Previous </button>
                    <span className="font-semibold"> Page {currentPage} of {totalPages} </span>
                    <button onClick={() => fetchDoctors(currentPage + 1)} disabled={currentPage === totalPages} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400" > Next </button>
                </div>
            </div>
        </div>
    )
}

export default PatientDashboard;
