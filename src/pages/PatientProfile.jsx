import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../Utils'

const PatientProfile = () => {
  const [patient, setPatient] = useState(null)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/patientprofile`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      if (response.status === 403) {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
        localStorage.removeItem("Role")
        setTimeout(() => {
          navigate('/patientdashboard', { replace: true })
        }, 1000);
        handleError("Your token is expired so login again")
        return
      }
      let data = await response.json()
      if (response.ok) {
        setPatient(data)
      } else {
        handleError(data.message)
      }
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) 

  // Modified loading state with a Tailwind CSS animated spinner
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Profile Header */}
        <div className="bg-linear-to-r header-gradient from-blue-600 to-indigo-700 px-8 py-10 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/30 backdrop-blur-sm">
            {patient.User.FullName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{patient.User.FullName}</h1>
            <p className="text-blue-100 mt-1 font-medium">{patient.User.Email}</p>
            <span className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
              Patient Account
            </span>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Medical & Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Age</span>
              <span className="text-lg font-medium text-gray-800 mt-1 block">{patient.Age} years</span>
            </div>

            {/* Gender */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Gender</span>
              <span className="text-lg font-medium text-gray-800 mt-1 block">{patient.Gender}</span>
            </div>

            {/* Blood Group */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Blood Group</span>
              <span className="text-lg font-bold text-red-600 mt-1 block">{patient.Bloodgroup}</span>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Residential Address</span>
              <span className="text-lg font-medium text-gray-800 mt-1 block">{patient.Address}</span>
            </div>
          </div>
        </div>

        <button
        onClick={() => navigate('/editpatient')}
        className="mb-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >Edit Profile

        </button>


      </div>
    </div>
  )
}

export default PatientProfile
