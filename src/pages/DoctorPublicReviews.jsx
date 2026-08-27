import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError } from "../Utils"

const DoctorPublicReviews = () => {

const { doctorId } = useParams()

const [reviews, setReviews] = useState([])


const fetchReviews = async () => {

    try {

        const response = await fetch(
            `http://localhost:4000/auth/doctorpublicreviews/${doctorId}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )

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

}, [doctorId])


return (

    <div className="mt-10">

        <div className="flex items-center justify-between mb-6">

            <div>

                <h2 className="text-3xl font-bold text-gray-800">

                    Patient Reviews

                </h2>

                <p className="text-gray-500 mt-1">

                    What patients say about this doctor

                </p>

            </div>


            <div className="bg-yellow-100 px-4 py-2 rounded-xl">

                <span className="text-yellow-500 font-bold">

                    ★ {reviews.length}

                </span>

                <span className="text-gray-600 ml-2">

                    Reviews

                </span>

            </div>

        </div>


        {reviews.length === 0 ? (

            <div className="bg-gray-50 rounded-2xl p-8 text-center">

                <p className="text-gray-500 text-lg">

                    No reviews yet for this doctor.

                </p>

            </div>

        ) : (

            <div className="space-y-5">

                {reviews.map((review) => (

                    <div
                        key={review._id}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300"
                    >

                        <div className="flex items-center gap-4 mb-4">

                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">

                                {review.Patient.User.FullName.charAt(0)}

                            </div>


                            <div>

                                <h3 className="font-bold text-gray-800">

                                    {review.Patient.User.FullName}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    Verified Patient

                                </p>

                            </div>

                        </div>


                        <div className="flex gap-1 mb-3">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <span
                                    key={star}
                                    className={
                                        star <= review.Rating
                                            ? "text-yellow-400 text-xl"
                                            : "text-gray-300 text-xl"
                                    }
                                >

                                    ★

                                </span>

                            ))}

                        </div>


                        <p className="text-gray-700 leading-relaxed">

                            {review.Comment}

                        </p>

                    </div>

                ))}

            </div>

        )}

        <ToastContainer />

    </div>

)


}

export default DoctorPublicReviews
