import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'

const Review = () => {
const { doctorId } = useParams()

const [reviewData, setReviewData] = useState({
    Rating: '',
    Comment: ''
})


const handleChange = (e) => {

    setReviewData({

        ...reviewData,

        [e.target.name]: e.target.value

    })

}


const SubmitReview = async (e) => {

    e.preventDefault()

    const { Comment, Rating } = reviewData

    if (!Comment || !Rating) {

        return handleError(
            "Please provide both a rating and a comment"
        )

    }


    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/submitreview`,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: localStorage.getItem("token")

                },

                body: JSON.stringify({

                    Doctor: doctorId,

                    Comment: Comment,

                    Rating: Rating

                })

            }

        )


        const data = await response.json()


        if (response.ok) {

            handleSuccess(data.message)

            setReviewData({

                Rating: '',

                Comment: ''

            })

        } else {

            handleError(data.message)

        }


    } catch (err) {

        handleError(err.message)

    }

}


return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

            {/* HEADER */}

            <div className="text-center mb-8">

                <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl mb-4">

                    ★

                </div>

                <h1 className="text-3xl font-bold text-gray-800">

                    Leave a Review

                </h1>

                <p className="text-gray-500 mt-2">

                    Share your experience with this doctor

                </p>

            </div>


            <form
                onSubmit={SubmitReview}
                className="space-y-7"
            >


                {/* RATING */}

                <div>

                    <label className="block text-lg font-semibold text-gray-700 mb-4">

                        How would you rate your experience?

                    </label>


                    <div className="flex gap-3">

                        {[1, 2, 3, 4, 5].map((number) => (

                            <label
                                key={number}
                                className="cursor-pointer"
                            >

                                <input
                                    type="radio"
                                    name="Rating"
                                    value={number}
                                    checked={
                                        reviewData.Rating === String(number)
                                    }
                                    onChange={handleChange}
                                    className="hidden"
                                />


                                <span
                                    className={`text-5xl transition ${
                                        reviewData.Rating >= number
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                >

                                    ★

                                </span>

                            </label>

                        ))}

                    </div>


                    <p className="text-sm text-gray-500 mt-2">

                        {reviewData.Rating
                            ? `${reviewData.Rating} out of 5 stars`
                            : "Select a rating"}

                    </p>

                </div>


                {/* COMMENT */}

                <div>

                    <label
                        htmlFor="Comment"
                        className="block text-lg font-semibold text-gray-700 mb-3"
                    >

                        Your Review

                    </label>


                    <textarea

                        id="Comment"

                        name="Comment"

                        value={reviewData.Comment}

                        onChange={handleChange}

                        placeholder="Write your experience with this doctor..."

                        rows="6"

                        className="w-full border border-gray-300 rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"

                    />

                </div>


                {/* SUBMIT BUTTON */}

                <button

                    type="submit"

                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg"

                >

                    Submit Review

                </button>


            </form>

        </div>


        <ToastContainer />

    </div>

)


}

export default Review
