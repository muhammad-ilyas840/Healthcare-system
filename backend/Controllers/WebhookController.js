// const AppointmentModel = require("../Models/Appointments")
// const PaymentModel = require('../Models/Payment')
// const DoctorModel = require('../Models/Doctors')
// const Stripe = require('stripe')
// const stripe = new Stripe(process.env.Stripe_secret_key)

// const Webhook = async(req ,res)=>{
//     const sig = req.headers['stripe-signature']
//     let event;

//     try{
//         event = stripe.webhooks.constructEvent(
//             sig,
//             req.body,
//             process.env.Stripe_webhook_secret,
//             999999999
//         )
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send(err.message);
//     }

//     if(event.type === "checkout.session.completed"){
//         try{
//             const session = event.data.object
//             console.log(session.metadata)

//             await PaymentModel.create({
//                 Appointment : session.metadata.appointmentId,
//                 Patient : session.metadata.patientId,
//                 amount : session.amount_total / 100,
//                 paymentMethod : "Card",
//                 transactionId : session.payment_intent,
//                 paymentStatus : "Paid"
//             })
//             console.log("Payment Saved")

//             const appointment = await AppointmentModel.findById(session.metadata.appointmentId)
//             if (!appointment) {
//                 console.log("Appointment not found")
//                 return res.sendStatus(200)
//             }
//             console.log(appointment)

//         } catch(err){
//             console.log("DATABASE ERROR");
//             console.log(err);
//         }
//     }

//     res.sendStatus(200)
// }

// module.exports = Webhook;

const AppointmentModel = require("../Models/Appointments")
const PaymentModel = require("../Models/Payment")
const Stripe = require("stripe")
const dbConnect = require("../Models/db")

const stripe = new Stripe(process.env.Stripe_secret_key)

const Webhook = async (req, res) => {

    const sig = req.headers["stripe-signature"];

    console.log("Server time:", new Date().toISOString());
    console.log("Unix time:", Math.floor(Date.now() / 1000));
    console.log("Signature:", sig);
    console.log("Body is Buffer:", Buffer.isBuffer(req.body));

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.Stripe_webhook_secret
        );
    } catch (err) {
        console.log("WEBHOOK ERROR:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ...


    if (event.type === "checkout.session.completed") {

        try {

            await dbConnect()

            const session = event.data.object

            const appointmentId =
                session.metadata.appointmentId

            const patientId =
                session.metadata.patientId

            const appointment =
                await AppointmentModel.findById(appointmentId)

            if (!appointment) {
                console.log("Appointment not found")
                return res.sendStatus(200)
            }

            // Prevent duplicate payment
            const existingPayment =
                await PaymentModel.findOne({
                    Appointment: appointmentId,
                    paymentStatus: "Paid"
                })

            if (existingPayment) {
                console.log("Payment already exists")
                return res.sendStatus(200)
            }

            await PaymentModel.create({

                Appointment: appointmentId,

                Patient: patientId,

                amount: session.amount_total / 100,

                paymentMethod: "Card",

                transactionId: session.payment_intent,

                paymentStatus: "Paid"
            })

            console.log("Payment saved successfully")

        } catch (err) {

            console.log("DATABASE ERROR:", err)

            return res.status(500).send("Database error")
        }
    }

    res.sendStatus(200)
}

module.exports = Webhook