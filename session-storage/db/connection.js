import mongoose from "mongoose"

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName : 'session'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log('connection Sucess...')
    }catch(e){
        console.log(e)
    }
}

export default connectDB;