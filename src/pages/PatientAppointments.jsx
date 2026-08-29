import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(
  import.meta.env.VITE_Stripe_Publishable_key
)

const PatientAppointments = () => {

    const [appointmentsList, setAppointmentsList] = useState([])

    const fetchAppointments = async (e)=>{
        const headers = {
                headers : { 'Authorization': localStorage.getItem('token')}
            }
        try{
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/patientappointments` , headers)
            let data = await response.json()
            if(response.ok){
                setAppointmentsList(data)
                // handleSuccess("Your appointments are here")
            }
        } 
        catch(err){ 
            handleError(err)
        }
    }

    useEffect(() => {
        fetchAppointments()
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

        const makePayment = async(appointmentId)=>{
          try{
            let response = await fetch(`
              ${import.meta.env.VITE_API_URL}/auth/create-checkout-session/${appointmentId}` , {
              method : "POST",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            let data = await response.json()
            if (!response.ok) {
              handleError(data.message);
              return;
            }
            window.location.href = data.url;

          } catch(err){
            handleError(err.message)
          }
        }
    
  return (
  <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 py-10 px-6">

    <div className="max-w-7xl mx-auto">

      <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-blue-700">
                My Appointments
            </h1>
         <p className="text-gray-500 mt-3 text-lg">
             View all your booked appointments
         </p>
      </div>

      {appointmentsList.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-600">
            No Appointments Yet
          </h2>

          <p className="text-gray-400 mt-3">
            Book an appointment with a doctor to see it here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {appointmentsList.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden"
            >

              <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-6 text-white">

                <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {item.Doctor?.User?.FullName?.charAt(0)}
                </div>

                <h2 className="text-2xl font-bold text-center">
                  {item.Doctor?.User?.FullName}
                </h2>

                <p className="text-center mt-2 opacity-90">
                  {item.Doctor?.Specialization}
                </p>

              </div>

              <div className="p-6 space-y-4">

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Hospital
                  </span>

                  <span className="text-gray-800">
                    {item.Doctor?.Hospital}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Fee
                  </span>

                  <span className="text-green-600 font-bold">
                    Rs. {item.Doctor?.ConsultationFee}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Appointment
                  </span>

                  <span>
                    {new Date(item.AppointmentDate).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-gray-600 mb-1">
                    Reason
                  </p>

                  <p className="bg-gray-100 rounded-lg p-3">
                    {item.Reason}
                  </p>
                </div>

                <div className="flex justify-between items-center">

                  <span className="font-semibold text-gray-600">
                    Status
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      item.Status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.Status === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : item.Status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.Status}
                  </span>

                </div>

              </div>
              {item.Status === "Confirmed" && (
                <button
                onClick={() =>
                  updateAppointmentStatus(item._id, "Cancelled")
                }
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl"
                >Cancel Appointment
                </button>
              )}

              {item.Status === "Completed" && (
                <button
              onClick={() =>
              makePayment(item._id)
            }
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
            >Pay for appointment
            </button>
              )}

              
              
              </div>
            

          ))}

        </div>
      )}

    </div>
    <ToastContainer/>

  </div>
);
}

export default PatientAppointments
