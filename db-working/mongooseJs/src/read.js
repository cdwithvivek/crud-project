const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vpChannel')
.then ( () => console.log('connected'))
.catch ( e => console.log(e))

const playlistSchema = new mongoose.Schema( 
    {
        name : { 
                    type : String,
                    required : true
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


const getDocument = async () => {
    try{
        const result1 = await Playlist
        .find({videos : {$gte : 40} })
        .select({ _id: 0, name : 1})
        // .limit(1)

        //in operator -> database
        const result2 = await Playlist
        .find( {ctype : {$in : ['Back End', 'DataBase']} })
        .select({ _id: 0, name : 1})

        //logical operator
        const result3 = await Playlist
        .find( { $and : [ {ctype : 'Front End'}, {active : true} ] })
        .select({ _id: 0, name : 1})
        .countDocuments()

        const result4 = await Playlist
        .find()
        .select({ _id: 0, name : 1})
        .sort({name : 1})
        console.log(result4)
    
    }catch( e) {
        console.log(e)
    }
}




getDocument();