const mongoose = require("mongoose");

const dbConnect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.Mongo_Url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Connection error:", err);
        throw err;
    }
};

module.exports = dbConnect;