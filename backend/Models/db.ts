import mongoose from 'mongoose'

const dbConnect = async () : Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.Mongo_Url as string);
        console.log("MongoDB connected successfully");
    } catch (err : unknown) {
        console.log("Connection error:", err instanceof Error ? err.message : "Error occured while connection");
        throw err;
    }
};

export default dbConnect;