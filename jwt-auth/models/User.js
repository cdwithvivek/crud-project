import mongoose from "mongoose"
import bcrpyt from "bcrypt"
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: true },
})

//hashing the password calling in pre save ->
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next()
    const hash = await bcrpyt.hash(this.password, 12)
    this.password = hash
    return next()
  } catch (e) {
    console.log(e)
  }
})

//collection
const UserModel = new mongoose.model("user", userSchema)

export default UserModel
