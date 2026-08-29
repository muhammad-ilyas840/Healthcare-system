
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../Utils"
import { useNavigate } from "react-router-dom"

export default function DoctorSignup() {

  const navigate = useNavigate()

  const [doctorData, setDoctorData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Specialization: '',
    Gender: '',
    Experience: '',
    Hospital: '',
    ConsultationFee: '',
    AvailableDays: '',
    AvailableFrom: '',
    AvailableTo: ''
  })

  const doctorRegister = async (e) => {

    e.preventDefault()

    const {
      FullName,
      Email,
      Password,
      Specialization,
      Gender,
      Experience,
      Hospital,
      ConsultationFee,
      AvailableDays,
      AvailableFrom,
      AvailableTo
    } = doctorData

    if (
      !FullName ||
      !Email ||
      !Password ||
      !Specialization ||
      !Gender ||
      !Experience ||
      !Hospital ||
      !ConsultationFee ||
      !AvailableDays ||
      !AvailableFrom ||
      !AvailableTo
    ) {
      return handleError("Every field must be filled")
    }

    // Convert manually typed days into an array
    const daysArray = AvailableDays
      .split(",")
      .map(day => day.trim())
      .filter(day => day !== "")

    try {

      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/doctor`,
        {
          method: "POST",

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            ...doctorData,
            AvailableDays: daysArray
          })
        }
      )

      const response = await data.json()

      if (data.ok) {

        handleSuccess(response.message)

        setTimeout(() => {
          navigate('/login')
        }, 1000)

      } else {

        console.log(response)

        handleError(
          response.error || response.message
        )
      }

    } catch (err) {

      handleError(err.message)

    }

  }

  const handlechange = (e) => {

    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    })

  }

  return (

    <div className="min-h-screen bg-linear-to-r from-green-100 to-emerald-100 flex justify-center items-center py-10 px-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-green-700">
          Doctor Registration
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join our healthcare platform
        </p>

        <form
          className="space-y-5"
          onSubmit={doctorRegister}
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="FullName"
            value={doctorData.FullName}
            onChange={handlechange}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Email"
            value={doctorData.Email}
            onChange={handlechange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Password"
            value={doctorData.Password}
            onChange={handlechange}
          />

          <input
            type="text"
            placeholder="Specialization"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Specialization"
            value={doctorData.Specialization}
            onChange={handlechange}
          />

          <select
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Gender"
            value={doctorData.Gender}
            onChange={handlechange}
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
            placeholder="Experience (Years)"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Experience"
            value={doctorData.Experience}
            onChange={handlechange}
          />

          <input
            type="text"
            placeholder="Hospital"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="Hospital"
            value={doctorData.Hospital}
            onChange={handlechange}
          />

          <input
            type="number"
            placeholder="Consultation Fee"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="ConsultationFee"
            value={doctorData.ConsultationFee}
            onChange={handlechange}
          />

          <input
            type="text"
            placeholder="Available Days (e.g. Monday, Tuesday, Friday)"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            name="AvailableDays"
            value={doctorData.AvailableDays}
            onChange={handlechange}
          />

          <p className="text-sm text-gray-500">
            Separate each day with a comma.
          </p>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-semibold mb-2">
                Available From
              </label>

              <input
                type="time"
                name="AvailableFrom"
                value={doctorData.AvailableFrom}
                onChange={handlechange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Available To
              </label>

              <input
                type="time"
                name="AvailableTo"
                value={doctorData.AvailableTo}
                onChange={handlechange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

            </div>

          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            type="submit"
          >
            Register
          </button>

        </form>

      </div>

      <ToastContainer />

    </div>

  )
}

