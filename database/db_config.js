import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connectDB = async(req, res)=>{
    try {        
        const connection = await mongoose.connect(process.env.mongoDBconnectionString);
        console.log("DB Connected");
        return connection;
    } catch (error) {
        res.status(500).json({message:"DB is not connected"})
    }
}

export default connectDB;

