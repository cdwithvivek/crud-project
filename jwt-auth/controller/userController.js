import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req,res) => {
        const {name,email,password,password_confirmation,tc} = req.body
        // collection mai data find
        const existedUser = await UserModel.findOne({email})
        if(existedUser){
            res.send({"status" : "failed", "message" : "Email already exists" })
        }else{
            //validation before registration
            if(name && email && password && password_confirmation && tc){
                //validating email and password
                if(password == password_confirmation){
                    try{
                        //hashing
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password,salt)
                        //sending data to database
                        const doc = new UserModel({name,email,password : hashPassword ,tc})
                        await doc.save()
                        res.send({name,email,password})
                    
                    }catch(e){
                        res.send({"error": e})
                    }
                }else{
                    res.send({"status" : "failed", "message" : "cannot conform password , not match" })
                }
                
                
                
            }else{
                res.send({"status" : "failed", "message" : "All fields are required" })
            }
        }
    }

    // user login

    static userLogin = async (req,res) => {
        try{
            const {email,password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email})
                console.log(user)
                if(user){
                    // decrypt password
                    const isMatch = await decrypt.compare(password,user.password)
                    
                    if(isMatch){
                        res.send({"status" : "success", "message" : "Logged In" }) 
                    }else{
                        res.send({"status" : "failed", "message" : "Email or password is wrong" }) 
                    }
                }else{
                   res.send({"status" : "failed", "message" : "Not Register User" }) 
                }
                

            }else{
                res.send({"status" : "failed", "message" : "All fields are required" })
            }
        }catch(e){
                res.send({"status" : "failed", "message" :"unable to login" })
        }
    }
}


export default UserController
