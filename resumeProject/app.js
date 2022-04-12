import express from "express"
import router from "./routes/web.js"
const app = express()
const port = process.env.PORT || 3000
// set up template
app.set('view engine', 'ejs')
//static file
app.use(express.static('public'))
//loading router
app.use('/',router)
//listening to router
app.listen(port, ()=>{`listening at port ${port}`})
