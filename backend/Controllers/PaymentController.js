const AppointmentModel = require("../Models/Appointments")
const PaymentModel = require("../Models/Payment")

const Stripe = require("stripe")
const stripe = new Stripe(process.env.Stripe_secret_key)

const CreateCheckoutSession = async (req, res) => {
    try {
        const { appointmentId } = req.params

        const appointment = await AppointmentModel.findById(appointmentId)
        .populate({
            path: "Doctor",
            populate: {
                path: "User"
            }
        })
        .populate("Patient")
        
        if (!appointment) {
            return res.status(404).json({ message: "No appointment found" })
        }
        if (appointment.Status !== "Completed") {
            return res.status(400).json({ message: "Only completed appointments can be paid" })
        }
        const existingPayment = await PaymentModel.findOne({
            Appointment : appointmentId,
            paymentStatus : "Paid"
        })
        if(existingPayment){
            return res.status(400).json({message : "Payment already paid"})
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: appointment.Doctor.User.FullName
                        },
                        unit_amount: appointment.Doctor.ConsultationFee * 100
                    },
                    quantity: 1

                }
            ],
            mode: "payment",
            metadata: {
                appointmentId: appointment._id.toString(),
                patientId: appointment.Patient._id.toString()
            },
            success_url: "https://healthcaresystemfrontend.vercel.app/payment-success",
            cancel_url: "https://healthcaresystemfrontend.vercel.app/payment-cancel",
        })
        console.log(session.url);
        console.log(session.metadata);
        res.status(200).json({ url: session.url })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message : "Internal server error",
        error: err.message
        })
    }
}


// const AppointmentModel = require("../Models/Appointments")
// const PaymentModel = require("../Models/Payment")

// const Stripe = require("stripe")
// const stripe = new Stripe(process.env.Stripe_secret_key)

// const CreateCheckoutSession = async (req, res) => {

//     try {

//         const { appointmentId } = req.params

//         const appointment =
//             await AppointmentModel.findById(appointmentId)
//                 .populate({
//                     path: "Doctor",
//                     populate: {
//                         path: "User"
//                     }
//                 })
//                 .populate("Patient")

//         if (!appointment) {
//             return res.status(404).json({
//                 message: "No appointment found"
//             })
//         }

//         // Make sure this appointment belongs to logged-in patient
//         if (
//             appointment.Patient.User.toString() !==
//             req.user.id.toString()
//         ) {
//             return res.status(403).json({
//                 message: "You cannot pay for this appointment"
//             })
//         }

//         // Only confirmed appointments can be paid
//         if (appointment.Status !== "Confirmed") {
//             return res.status(400).json({
//                 message: "Only confirmed appointments can be paid"
//             })
//         }

//         // Check if already paid
//         const existingPayment =
//             await PaymentModel.findOne({
//                 Appointment: appointment._id,
//                 paymentStatus: "Paid"
//             })

//         if (existingPayment) {
//             return res.status(400).json({
//                 message: "Appointment is already paid"
//             })
//         }

//         const session =
//             await stripe.checkout.sessions.create({

//                 payment_method_types: ["card"],

//                 line_items: [
//                     {
//                         price_data: {
//                             currency: "usd",

//                             product_data: {
//                                 name:
//                                     appointment.Doctor.User.FullName
//                             },

//                             unit_amount:
//                                 appointment.Doctor.ConsultationFee * 100
//                         },

//                         quantity: 1
//                     }
//                 ],

//                 mode: "payment",

//                 metadata: {
//                     appointmentId:
//                         appointment._id.toString(),

//                     patientId:
//                         appointment.Patient._id.toString()
//                 },

//                 success_url:
//                     "http://localhost:5173/payment-success",

//                 cancel_url:
//                     "http://localhost:5173/payment-cancel"
//             })

//         res.status(200).json({
//             url: session.url
//         })

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Internal server error",
//             error: err.message
//         })
//     }
// }

// module.exports = CreateCheckoutSession


module.exports = CreateCheckoutSession