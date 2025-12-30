import mongoose from "mongoose";;
import dotenv from "dotenv";

dotenv.config();

const mongourl = process.env.MONGO_URL


let mongoConnect = async()=>{
    try {
        await mongoose.connect(mongourl);
        console.log("connected to database")
    } catch (error) {
        console.log("error while connecting to database")
    }
}

export default mongoConnect;