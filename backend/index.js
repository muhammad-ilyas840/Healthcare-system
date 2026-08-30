const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyparser = require('body-parser')
const port = process.env.PORT || 4000

const Authrouter = require('./Routes/AuthRouter')
const Webhook = require('./Controllers/WebhookController')

app.use(cors({
    origin: "https://healthcare-system-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.options("*", cors())

app.post('/auth/webhook' ,
    express.raw({type : "application/json"}),
    Webhook
)


app.use(bodyparser.json())

require('./Models/db')

app.get('/' , (req , res)=>{
    res.send("<h1>Good<h1/>")
})

app.use('/auth' , Authrouter)

module.exports = app
