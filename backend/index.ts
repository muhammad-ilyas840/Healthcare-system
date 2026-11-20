
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyparser from 'body-parser'

import Authrouter from './Routes/AuthRouter'
import Webhook from './Controllers/WebhookController'
import dbConnect from './Models/db'


const app = express()
const port = process.env.PORT || 4000

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://healthcaresystemfrontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to MongoDB before handling authentication and payment requests.
app.use('/auth', async (_req, _res, next) => {
    try {
        await dbConnect()
        next()
    } catch (err) {
        next(err)
    }
});

app.post(
    '/auth/webhook',
    express.raw({ type: "application/json" }),
    Webhook
);

app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("<h1>Good</h1>");
});

app.use('/auth', Authrouter);

// Start the server locally.
if (require.main === module) {
    dbConnect()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        })
        .catch((err: unknown) => {
            console.error(
                "Failed to connect to MongoDB:",
                err instanceof Error ? err.message : String(err)
            );
            process.exit(1);
        });
}

export = app
