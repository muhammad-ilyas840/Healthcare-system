import mongoose from 'mongoose'

interface AppointmentData {
    Doctor: mongoose.Types.ObjectId
    Patient: mongoose.Types.ObjectId
    AppointmentDate: Date
    Reason: string
    Status?: "Pending" | "Confirmed" | "Completed" | "Cancelled"
}

const AppointmentSchema = new mongoose.Schema<AppointmentData>({
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

    AppointmentDate: {
        type: Date,
        required: true,
    },

    Reason: {
        type: String,
        required: true
    },

    Status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
        default: "Pending"
    }
}, {
    timestamps: true
})

const AppointmentModel = mongoose.model("Appointments", AppointmentSchema)

export default AppointmentModel
