import mongoose from "mongoose";

const mongooseConnection = {
    isConnected: 0
}

export const connect = async() => {
    if (mongooseConnection.isConnected) {
        console.log("We are connected");
        return;
    }

    if (mongoose.connections.length > 0) {
        mongooseConnection.isConnected = mongoose.connections[0].readyState;

        if (mongooseConnection.isConnected === 1) {
            console.log('Using previous connection');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    console.log("Connected...")

}

export const disconnect = async() => {

    if (process.env.NODE_ENV === 'development') return;

    if (mongooseConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongooseConnection.isConnected = 0;
    console.log("Disconnected...")
}