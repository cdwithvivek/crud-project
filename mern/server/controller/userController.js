import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

class userController {
    static home = (req,res) => {
        res.send('home page')
    }
    static registerUser = async (req,res) => {
        try{
            const {name,email,phone,work,password,cpassword} = req.body
            if( !name || !email || !phone || !work || !password || !cpassword ){
                return res.status(422).send('all fields are necessary')
            }
            const existedUser = await User.findOne({email})
            if(existedUser){
                return res.status(422).send('email already exists')
            }
            else{
                
                try{

                    const user = new User ({name,email,phone,work,password,cpassword})
                    const result = await user.save();
                    return res.status(200).send({"msg" :"successfully send to database"})
                }catch(e){
                    return res.status(500).send({"msg" : "cannot store in database"})
                }
                
            }
        }catch(e){
            return res.send(500).send({"msg" : "something went wrong"})
        }
    }

    // login router
    static userLogin = async (req,res) => {
        try{
            const {email,password} = req.body;
            //empty fileds
            if(!email || !password){
                return res.status(404).send({'msg' : 'fill the data'})
            }
            const result = await User.findOne({email})
            //existed user
            if(result === null){
                return res.status(404).send({'msg' : 'user not exists'})
            }
            //validating password
            const isMatch = await bcrypt.compare(password, result?.password)
            if( !isMatch || email !== result?.email){
                return res.status(404).send({'msg' : 'cannot validate'})
            }
            // logged in
            else{
                //jwt.sign() and jwt.verify()
                const token = await result.generateAuthToken()
                res.cookie('jwtToken',token, {
                    //ms
                    expires : new Date(Date.now() + 14*24*60*60),
                    httpOnly : true
                })
                
                return res.status(200).send({'msg' : 'logged in'})
            }
        
        }catch(e){
            return res.status(500).send({'msg' : 'cannot login'})
        }
    }
}

export default userController