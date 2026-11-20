import mongoose from 'mongoose'

interface ReviewData {
    Doctor: mongoose.Types.ObjectId
    Patient: mongoose.Types.ObjectId
    Rating: number
    Comment: string
}

const ReviewSchema = new mongoose.Schema<ReviewData>({
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients",
        required: true
    },
    Rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    Comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ReviewModel = mongoose.model("Reviews", ReviewSchema)

export default ReviewModel
