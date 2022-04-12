import mongoose from "mongoose";

// Define schema

const studentSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required:true,
            trim:true
        },
        age : {
            type: Number,
            required: true,
            min:18,
            max:60
        },
        fees : {
            type : mongoose.Decimal128,
            required : true,
            validate : v => v>=0
        }
    }
)

// model

const studentModel =   new mongoose.model('student',studentSchema)

export default studentModel;