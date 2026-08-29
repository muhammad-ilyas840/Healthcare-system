import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError } from "../Utils"

const DoctorReviews = () => {

const navigate = useNavigate()

const [reviews, setReviews] = useState([])

const fetchReviews = async () => {

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/doctorreview`,
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

        if (response.ok) {

            setReviews(data)

        } else {

            handleError(data.message)

        }

    } catch (error) {

        handleError(error.message)

    }

}


useEffect(() => {

    fetchReviews()

}, [])


return (

    <div className="min-h-screen bg-gray-100 px-5 py-10">
        <div className="bg-yellow-100 px-4 py-2 rounded-xl">

                <span className="text-yellow-500 font-bold">

                    ★ {reviews.length}

                </span>

                <span className="text-gray-600 ml-2">

                    Reviews

                </span>

            </div>


        <div className="max-w-5xl mx-auto">

            <div className="text-center mb-10">

                <h1 className="text-4xl font-bold text-gray-800">

                    Patient Reviews

                </h1>

                <p className="text-gray-500 mt-2">

                    See what your patients say about you

                </p>

            </div>


            {reviews.length === 0 ? (

                <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

                    <h2 className="text-2xl font-semibold text-gray-600">

                        No reviews yet

                    </h2>

                    <p className="text-gray-400 mt-2">

                        Your patient reviews will appear here.

                    </p>

                </div>

            ) : (

                <div className="grid md:grid-cols-2 gap-6">

                    {reviews.map((review) => (

                        <div
                            key={review._id}
                            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                        >

                            <div className="flex items-center gap-4 mb-5">

                                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">

                                    {review.Patient.User.FullName.charAt(0)}

                                </div>


                                <div>

                                    <h2 className="text-xl font-bold text-gray-800">

                                        {review.Patient.User.FullName}

                                    </h2>

                                    <p className="text-gray-500">

                                        {review.Patient.User.Email}

                                    </p>

                                </div>

                            </div>


                            <div className="flex gap-1 mb-4">

                                {[1, 2, 3, 4, 5].map((star) => (

                                    <span
                                        key={star}
                                        className={
                                            star <= review.Rating
                                                ? "text-yellow-400 text-2xl"
                                                : "text-gray-300 text-2xl"
                                        }
                                    >

                                        ★

                                    </span>

                                ))}

                            </div>


                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-gray-700 leading-relaxed">

                                    "{review.Comment}"

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

        <ToastContainer />

    </div>

)


}

export default DoctorReviews

