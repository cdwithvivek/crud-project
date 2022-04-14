import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    work : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    cpassword :  {
        type : String,
        required : true,
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.cpassword,12)
    }  
    next()
})

//genarting token
userSchema.methods.generateAuthToken = async function () {
    try{
        //payload and secret key payload => unique
        let tokenJWT = await jwt.sign({_id : this._id}, process.env.SECRET_KEY)
        // sending token to database
        this.tokens = this.tokens.concat({token:tokenJWT})
        await this.save()
        return tokenJWT
    }catch(e){
        console.log(e)
    }
}

const User = new mongoose.model('user',userSchema)

export default User;

