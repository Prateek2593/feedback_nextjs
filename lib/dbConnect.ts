/*
-Import mongoose: Import the mongoose library to interact with MongoDB.
-Define ConnectionObject type: Create a TypeScript type to track the connection state.
-Initialize connection object: Set up an object to store the connection status.
-dbConnect function: Asynchronous function to connect to the database.
-Check if already connected: If already connected, log a message and return.
-Attempt connection: Use mongoose.connect with the connection string from MONGODB_URI.
-Set connection state: Update the connection.isConnected with the readyState of the connection.
-Log success: Log success messages for debugging.
-Handle errors: Catch any connection errors, log them, and exit the process.
-Export dbConnect: Export the function for use in other modules.
*/


import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject={}

async function dbConnect():Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to db");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{})

        connection.isConnected = db.connections[0].readyState

        console.log(db);
        console.log(db.connections);

        console.log("DB connected successfully");
        
    } catch (error) {
        console.log("DB connection failed", error);
        
        process.exit(1)
    }
}

export default dbConnect;