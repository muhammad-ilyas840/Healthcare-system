import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    previousAppointments : 0,
    yesterdayAppointments : 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalAppointments: 0
  })
  const [loggedInDoctor, setloggedInDoctor] = useState('')
  useEffect(() => {
    setloggedInDoctor(localStorage.getItem("loggedInUser"))
  }, [])

  const navigate = useNavigate()
  const handleLogout = ()=>{
          localStorage.removeItem('loggedInUser')
          localStorage.removeItem("token")
          setTimeout(() => {
              navigate('/login')
          }, 1000);
          handleSuccess("You have logged out")
      }
      
    const seeAppointments = ()=>{
      setTimeout(() => {
        navigate('/doctorappointments')
      }, 1000);
    }

    const fetchStats = async ()=>{
      try {

        let response = await fetch("http://localhost:4000/auth/appointmentdates" , {
          headers : {
            Authorization : localStorage.getItem('token')
          }
        })
        if(response.status === 403){
          localStorage.removeItem("token")
          localStorage.removeItem("loggedInUser")
          localStorage.removeItem("Role")
          setTimeout(() => {
            navigate('/login')
          }, 1000);
          handleError("Your token has expired")
          return;
        }
        let data = await response.json()
        console.log(data)
        if(response.ok){
          setStats(data)
          handleSuccess(data.message)
        }
      } catch (error) {
        handleError(error)
      }
    }

    useEffect(() => {
      fetchStats()
    }, [])
    
  
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Navigation Bar */}
      <nav className="bg-linear-to-r from-blue-700 to-indigo-800 border-b border-blue-800 sticky top-0 z-50 px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Side Brand Title */}
          <div className="text-2xl font-extrabold text-white tracking-wide w-full sm:w-auto text-center sm:text-left">
            Doctor Dashboard
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-5 py-2 text-sm font-semibold transition backdrop-blur-sm"
              onClick={seeAppointments}
            >
              Check Appointments
            </button>
            <button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-5 py-2 text-sm font-semibold transition backdrop-blur-sm"
              onClick={() => { navigate('/doctorprofile') }}
            >
              View Profile
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-5 py-2 text-sm font-semibold transition shadow-md shadow-red-900/20"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Text */}
        <div className='text-center my-6'>
          <h1 className='font-bold text-3xl text-gray-800'>
            Welcome back, <span className="text-blue-600">Dr. {loggedInDoctor}</span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Yesterday's Appointments
              </h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.yesterdayAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Previous Appointments
              </h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.previousAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Today's Appointments
              </h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.todayAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Pending Appointments
              </h2>
              <p className="text-4xl font-bold text-yellow-500 mt-2">
                  {stats.pendingAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Confirmed Appointments
              </h2>
              <p className="text-4xl font-bold text-green-500 mt-2">
                  {stats.confirmedAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Completed Appointments
              </h2>
              <p className="text-4xl font-bold text-emerald-600 mt-2">
                  {stats.completedAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Cancelled Appointments
              </h2>
              <p className="text-4xl font-bold text-red-500 mt-2">
                  {stats.cancelledAppointments}
              </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Total Appointments
              </h2>
              <p className="text-4xl font-bold text-purple-600 mt-2">
                  {stats.totalAppointments}
              </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard;
