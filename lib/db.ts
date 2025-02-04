import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("No MongoDB URI provided, set MONGODB_URI environment variable");
    }

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        console.log("=> using existing database connection");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
    }
    try {
        cached.conn = await cached.promise;
        console.log("=> new database connection");
       
    } catch (error) {
        cached.promise = null;
        throw new Error(`${error} - Check your MongoDB URI, and make sure it's correct`);
    }

    return cached.conn;
}