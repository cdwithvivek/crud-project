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

const updateDocument = async (_id) => {
    try {
        const result1 = await Playlist
                        .updateOne( {_id}, { $set : {name : 'JavaScript'} })
        console.log(result1)

    }catch( e ) {
        console.log(e)
    }
}


// updateDocument('62528bef907d3d924631b255')


const deleteDocument = async (_id) => {
    try{
        const result = await Playlist.deleteOne({_id})
        console.log(result)
    }catch(e){
        console.log(e)
    }
}



deleteDocument('62528bef907d3d924631b255')