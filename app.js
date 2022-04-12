import express from 'express'
import favicon from 'serve-favicon'
import { join } from 'path'
import web from './routes/web.js'
import connectDB from './db/connection.js'
import bodyParser from 'body-parser'
import multer from 'multer'

//express setup
const app = express()
const port = process.env.PORT || 3000

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
const upload = multer()
app.use(upload.array());



// router setup
app.get('/', (req,res) => {
    res.send('hello')
})
app.use('/student',web)


//static file
app.use(express.static( join(process.cwd(),'public') ) )

//db setup
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://alex:alex@cluster0.irgzg.mongodb.net/?retryWrites=true&w=majority"
connectDB(DATABASE_URL)


// template engine setup
app.set('view engine', 'ejs')
app.set('views','./views')

// favicon
app.use(favicon(join(process.cwd(), 'public', 'favicon.ico')))

//listening at port
app.listen(port, () => console.log(`Listening at port ${port}`))