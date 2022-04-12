import userModel from "../models/user.js"
import bcrypt from 'bcrypt'
class UserController {
    static home = (req,res) => {
        res.render('index')
    }

    static registration =  (req,res) =>{
        res.render('registration')
    }

    static createUserDoc = async (req,res) => {
        try{
            const {name,email,password} = req.body
            let hashPassword = await bcrypt.hash(password,10);

            console.log(req.body)
            const doc = new userModel({name,email,password : hashPassword})
            await doc.save()
            res.redirect('/login')
        }catch(e){
            console.log(e)
        }finally{
            res.render('registration')
        }

        
    }

    static verifyLogin = async (req,res) => {
        try{
            const {email,password} = req.body;
            const result = await userModel.findOne({email})
            if(result?.email === email && bcrypt.compare(password,result?.password)){
                res.render('index')
            }else{

                res.send('<h1> Email or Password is not valid </h1>')
            }

            
        }catch(e){

        }
    }

    static login =  (req,res) =>{
        res.render('login')
    }
}

export default UserController;