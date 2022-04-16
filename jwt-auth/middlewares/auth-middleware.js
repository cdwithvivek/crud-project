import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"

const checkUserAuth = async (req, res, next) => {
  let token
  //checking the token for userAuthentication
  //client must send token to access protect page in Authentication Headers => cookies/session etc
  const { authorization } = req.headers
  //checking the authorizaton and Bearer
  if (authorization && authorization.startsWith("Bearer")) {
    // valid token hai
    try {
      token = authorization.split(" ")[1]
      // console.log(token)
      //verify the token
      // database ki userID wapas mil gyi hai
      const { userID } = jwt.verify(token, process.env.SECRET_KEY)
      // console.log(userID)
      //Get User
      // adding user in req object for further use in other callback
      const user = await UserModel.findById(userID).select({ password: 0 })
      //   console.log(user)
      req.user = user
      next()
      //verify token end
    } catch (e) {
      res
        .status(404)
        .send({ status: "failed", msg: "Unauthorized User", error: e.message })
    }
  } else {
    res
      .status(401)
      .send({ status: "failed", msg: "Unauthorized User, no token" })
  }
}

export default checkUserAuth
