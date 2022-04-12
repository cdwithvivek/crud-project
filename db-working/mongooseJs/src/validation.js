const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vpChannel')
.then ( () => console.log('connected'))
.catch ( e => console.log(e))

const playlistSchema = new mongoose.Schema( 
    {
        name : { 
                    type : String,
                    required : true,
                    unique : true,
                    lowercase : true,
                    trim : true,
                    minlength : [2, 'minimum'],
                    // maxlength : [20, 'maximum']
               },
        ctype : String,
        videos : Number,
        active : Boolean,
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
        name : '                    MonGoDb          ',
        cytpe : 'DataBase',
        videos : 20,
        author : 'Vivek Pandey',
        active : false
    })
    const result  = await  newElement.save();
    console.log(result)
    }catch(e){
        console.log(e._message)
    }
}



createDocument();