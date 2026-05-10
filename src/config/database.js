const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
        );
        console.log(
            `Database connected: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        console.log("Database connection failed", error);
        throw error;
    }
}

module.exports = connectDB;