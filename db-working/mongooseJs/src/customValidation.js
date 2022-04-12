const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://localhost:27017/vpChannel')
.then ( () => console.log('connected'))
.catch ( e => console.log(e))

const playlistSchema = new mongoose.Schema( 
    {
        name : { 
                    type : String,
                    required : true,
               },
        ctype : String,
        videos : {
                    type : Number,
                    validate( value){
                        if(value<0)
                            throw new Error('cannot be negative')
                    }

                 },
        active : Boolean,
        author : String,
        email :  {
                    type : String,
                    required: true,
                    unique : true,
                    validate ( value){
                       if(!validator.isEmail(value)){
                            throw new Error ('not a email valid')
                       }  
                    }
                 },
        date : {
                    type : Date,
                    default : Date.now
               }

    }
)

// creating collections
const Playlist = new mongoose.model('Playlist', playlistSchema)   // class

const createDocument = async () => {
    try{
    const newElement = new Playlist( {
        name : 'MonGoDb',
        cytpe : 'DataBase',
        videos : -5,
        author : 'Vivek Pandey',
        email : 'wrong email',
        active : false
    })
    const result  = await  newElement.save();
    console.log(result)
    }catch(e){
        console.log(e)
    }
}



createDocument();