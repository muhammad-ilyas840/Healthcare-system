import mongoose from 'mongoose'

interface PaymentData {
    Patient: mongoose.Types.ObjectId
    Appointment: mongoose.Types.ObjectId
    amount?: number
    paymentMethod?: string
    transactionId?: string
    paymentStatus?: "Pending" | "Paid" | "Failed"
}

const PaymentSchema = new mongoose.Schema<PaymentData>({
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    },
    Appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments',
        required: true
    },
    amount: Number,
    paymentMethod: String,
    transactionId: String,
    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid",
            "Failed"
        ],
        default: "Pending"
    }
}, { timestamps: true })

const PaymentModel = mongoose.model("Payments", PaymentSchema)

export default PaymentModel
