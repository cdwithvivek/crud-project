import mongoose from "mongoose";

const connectDb = async (DATABASE_URL, DATABASE_NAME) => {
    try{
        const DB_OPTIONS = {
            dbName : DATABASE_NAME
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log('connected...')
    }catch(e){
        console.log(e)
    }
}

export default connectDb;