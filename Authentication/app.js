import express from "express";
import router from "./routes/web.js";
import connectDB from "./db/connection.js";
const port = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'
// express-appication
const app = express()

//db connection
connectDB(DATABASE_URL,'auth')

//middleware
//template
app.set('view engine', 'ejs')
app.set('views', './views')
//parser
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
//routing
app.use('/',router)

app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
})