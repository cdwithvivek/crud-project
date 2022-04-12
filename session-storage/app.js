import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import connectDB from './db/connection.js'
const app = express()
const port = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'

// connect to db
connectDB(DATABASE_URL)

//Session
const OPTIONS = {
    mongoUrl : DATABASE_URL,
    dbName : 'session',
    collectionName : 'sessions',
    ttl : 14*24*60*60,
    autoRemove : 'native'
}

app.use(session({
    name:'vivek-session',
    secret : 'iamkey',
    resave : false,
    saveUninitialized : true,
    cookie :  {maxAge: 2000000},
    store : MongoStore.create(OPTIONS)
}))

// express-session
app.get('/getSessionInfo', (req,res)=>{
    console.log(req.session.id)
    res.redirect('/')
} )

app.get('/deleteSessionInfo', (req,res)=>{
    
    req.session.destroy(function(err) {
        // cannot access session here
      })

    res.redirect('/')
} )

app.get('/regSessionInfo', (req,res) =>{
    req.session.regenerate( (err) => {
        console.log(`regeneration of session ${req.session.id}`)
    })
    res.redirect('/')
})

app.get('/', (req,res)=>{
    if(req.session.count){
        req.session.count++
    }else{
        req.session.count = 1;
    }
    res.send(`Count : ${req.session.count}`)
})


app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`)
})