import mongoose from 'mongoose'

interface DoctorData {
    User: mongoose.Types.ObjectId
    Specialization: string
    Gender: string
    Experience: number
    Hospital: string
    ConsultationFee: number
    AvailableDays?: string[]
    AvailableFrom?: string
    AvailableTo?: string
}

const DoctorSchema = new mongoose.Schema<DoctorData>({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    Specialization: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Experience: {
        type: Number,
        required: true
    },
    Hospital: {
        type: String,
        required: true
    },
    ConsultationFee: {
        type: Number,
        required: true
    },
    AvailableDays: {
        type: [String],
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    },
    AvailableFrom: {
        type: String
    },
    AvailableTo: {
        type: String
    }
})

const DoctorModel = mongoose.model("Doctors", DoctorSchema)

export default DoctorModel