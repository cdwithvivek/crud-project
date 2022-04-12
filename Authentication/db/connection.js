import mongoose from "mongoose"

const connectDB = async (DATABASE_URL,dataBaseName) => {
    try {
        const DB_OPTIONS = {
            dbName : dataBaseName
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log('connection Sucess...')
    }catch(e){
        console.log(e)
    }
}

export default connectDB;