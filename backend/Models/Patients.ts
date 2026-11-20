import mongoose from 'mongoose'

interface PatientData {
    User: mongoose.Types.ObjectId
    Age: number
    Gender: string
    Bloodgroup: string
    Address: string
}

const PatientSchema = new mongoose.Schema<PatientData>({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    Age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Bloodgroup: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
})

const PatientModel = mongoose.model("Patients", PatientSchema)

export default PatientModel