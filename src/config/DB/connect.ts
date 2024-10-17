import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("Connecting to Database...", process.env.MONGO_URL)
        const conn = await mongoose.connect(process.env.MONGO_URL || "", {
            dbName: process.env.DBENVOIRNMENT,
        });
        console.log(`MongoDB Connected: ${conn.connection.host} With Envoirment at DB ${conn.connection?.db?.databaseName}`);
    } catch (error) {
        console.log('Database connection error', error);
    }
}
