import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../config/emailConfig.js"
class UserController {
  //registratoin starts
  static userRegistration = async (req, res) => {
    try {
      const { name, email, password, password_conf, tc } = req.body
      const user = await UserModel.findOne({ email })
      // checking all filled entered or not
      if (!name || !password || !password_conf || !tc || !email) {
        throw new Error("All Fields are Required!")
      } // checking existed email
      else if (user) {
        throw new Error("User already exists!")
      } // checking the password
      else if (password !== password_conf) {
        throw new Error("Password don't Match")
      } // finally inserting into database
      else {
        const doc = new UserModel({ name, email, password, tc })
        const saved_user = await doc.save()
        // creating jwt token starts
        const token = jwt.sign(
          { userID: saved_user._id },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        )
        //created jwt token ends
        /*
            use -> client kai pass hai yai token wo cookies,session,localStorage etc
            mai rakh sakta hai aur decode karani pai user id return hogai jo ki data lanai mai
             helpful hoga aur jab tak token hai wo authenticated user hai
          🔥🔥🔥🔥🔥              
        */

        res.status(202).send({
          status: "success",
          msg: "Data Inserted Successfully",
          token,
        })
      }
    } catch (e) {
      res.status(400).send({ status: "failed", msg: e.message })
    }
  }
  //registration ends

  //login starts
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })

      //checking all fields
      if (!email || !password) {
        throw new Error("All fields are required!")
      } //if user exists or not
      else if (!user) {
        throw new Error("Wrong credentials!")
      } // finally matching the password
      else {
        // decrypting the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          throw new Error("Wrong credentials!")
        } else {
          // creating jwt token starts
          const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
            expiresIn: "5d",
          })
          //created jwt token ends
          res
            .status(200)
            .send({ status: "success", msg: "Logged in successfully!", token })
        }
      }
    } catch (e) {
      res.status(400).send({ status: "failed", msg: e.message })
    }
  }
  //login ends

  //change password start
  //login karnai kai baad hi change password feature milega 🍾🍾🍾
  static changeUserPassword = async (req, res) => {
    try {
      const { password, password_conf } = req.body
      if (!password || !password_conf) {
        throw new Error("All fields are required")
      } else if (password !== password_conf) {
        throw new Error("Both password don't Match")
      } else {
        const newHashedPassword = await bcrypt.hash(password, 12)
        // console.log(newHashedPassword)
        // console.log(req.user._id)
        await UserModel.findByIdAndUpdate(req.user._id, {
          password: newHashedPassword,
        })
        res
          .status(202)
          .send({ status: "success", msg: "Password is changed successfully!" })
      }
    } catch (e) {
      res.status(400).send({ status: "failed", msg: e.message })
    }
  }
  //change password end

  //logged user detail start
  static loggedUserDetails = async (req, res) => {
    res.send(req.user)
  }
  //logged user detail end

  //password reset
  /*
    email dena hoga and then create hoga password
  */
  //public route mai hai
  static sendUserPasswordResetEmail = async (req, res) => {
    //user email send kariga
    // req.body mai hai email
    const { email } = req.body
    try {
      if (!email) {
        throw new Error("Email is required")
      } else {
        //mathcing email
        const user = await UserModel.findOne({ email })
        if (!user) {
          throw new Error("Not a registerd email")
        } else {
          const secret = user._id + process.env.SECRET_KEY

          const token = await jwt.sign({ userID: user._id }, secret, {
            expiresIn: "15m",
          })
          //front-end link
          const link = `http://localhost:8000/api/user/reset-password/${user._id}/${token}`
          //sending this link to node mailer
          let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "geekshop - Password Reset Link",
            html: `<a href=${link}>Click here </a> to Reset Your Password`,
            text: "hello",
          })
          console.log(link)
          res
            .status(200)
            .send({ status: "failed", msg: "email send plz check you mail" })
        }
      }
    } catch (e) {
      res.status(400).send({ status: "failed", msg: e.message })
    }
  }

  // passwordReset start
  static userPasswordReset = async (req, res) => {
    // form
    const { password, password_conf } = req.body
    // we need the link data and tokens using params
    try {
      const { id, token } = req.params
      const user = await UserModel.findById(id)
      const new_secret = user._id + process.env.SECRET_KEY

      const user_id = await jwt.verify(token, new_secret)
      if (!password || !password_conf) {
        throw new Error("All fields are required")
      } else if (password !== password_conf) {
        throw new Error("Password doesn't match")
      } else {
        const newHashedPassword = await bcrypt.hash(password, 12)

        await UserModel.findByIdAndUpdate(user._id, {
          password: newHashedPassword,
        })
        res.status(202).send({
          status: "success",
          msg: "Password reset successfully!",
        })
      }
    } catch (e) {
      res.status(400).send({ status: "failed", msg: e.message })
    }
  }
  // passwordRest End
}

export default UserController
