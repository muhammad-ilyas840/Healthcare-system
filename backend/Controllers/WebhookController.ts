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

import AppointmentModel from "../Models/Appointments"
import PaymentModel from "../Models/Payment"
import type Stripe from "stripe"
import dbConnect from "../Models/db"
import type { Request, Response } from "express"
import StripeClient from 'stripe'

const stripeSecretKey = process.env.Stripe_secret_key
const stripeWebhookSecret = process.env.Stripe_webhook_secret

if (!stripeSecretKey || !stripeWebhookSecret) {
    throw new Error('Stripe environment variables are missing')
}

const stripe = new StripeClient(stripeSecretKey)

const Webhook = async (req : Request, res : Response) => {

    const sig = req.headers["stripe-signature"];

    if (typeof sig !== 'string') {
        return res.status(400).send('Missing Stripe signature')
    }

    if (!Buffer.isBuffer(req.body)) {
        return res.status(400).send('Invalid webhook body')
    }

    let event : Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            stripeWebhookSecret
        );
    } catch (err : unknown) {
        // console.log("WEBHOOK ERROR:", err.message);
        return res.status(400).send(`Webhook Error: ${ err instanceof Error ? err.message
            : "An unexpected error occured"
        }`);
    }

    // ...


    if (event.type === "checkout.session.completed") {

        try {

            await dbConnect()

            const session = event.data.object

            const appointmentId =
                session.metadata?.appointmentId

            const patientId =
                session.metadata?.patientId

            if (!appointmentId || !patientId) {
                return res.status(400).send('Missing appointment or patient metadata')
            }

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

            const transactionId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id
            if (!transactionId) {
                return res.status(400).send('Invalid payment information')
            }

            await PaymentModel.create({

                Appointment: appointmentId,

                Patient: patientId,

                amount: (session.amount_total ?? 0 ) / 100,

                paymentMethod: "Card",

                transactionId,

                paymentStatus: "Paid"
            })

            console.log("Payment saved successfully")

        } catch (err : unknown) {

            console.log("DATABASE ERROR:", err)

            return res.status(500).send("Database error")
        }
    }

    res.sendStatus(200)
}

export default Webhook