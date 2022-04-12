const mongoose = require('mongoose')
const validator = require('validator')

// schema
const studentSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            minlength : 3
        },

        email : {
            type : String,
            required : true,
            unique : [true, 'Already Present'],
            validate(val){
                if(!validator.isEmail(val)){
                    throw new Error('invalid Email')
                }
            }
        },

        phone : {
            type : Number,
            minlength : 10,
            maxlength : 10,
            required : true,
            unique : true
        },

        address: {
            type : String,
            required : true
        }
    }
)


//collection using model
const Student = new mongoose.model('Student',studentSchema)

module.exports = Student;