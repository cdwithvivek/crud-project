import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  try {
    // console.log("hi");
    const token = req.cookies.jwtToken;
    // console.log(token);
    // all data of user
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyToken);
    // finding the speficic user
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    //not fuound
    if (!rootUser) throw new Error("user not found");
    //setting value with req user
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // console.log(req.token, req.rootUser);
    next();
  } catch (e) {
    return res.status(401).send({ msg: "Unauthoraized" });
  }
};
