import mongoose from "mongoose";

const connectDB = async () =>{

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDb connect!! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("DB COnnection failed",error);
        
    }

}

export default connectDB;