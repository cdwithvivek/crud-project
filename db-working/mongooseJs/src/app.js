const mongoose = require('mongoose')

async function connection () {
    const obj = await mongoose.connect('mongodb://localhost:27017/vpChannel');
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


    const createDocument = async () => {
        try{
            const jsPlaylist = new Playlist( {
                name : 'javascript',
                ctype : 'Front End',
                videos : 50,
                author : 'Vivek Pandey',
                active : true
            })

            const reactPlaylist = new Playlist( {
                name : 'React JS',
                ctype : 'Front End',
                videos : 120,
                author : 'Vivek Pandey',
                active : true
            })

            const ExpressPlaylist = new Playlist( {
                name : 'Express JS',
                ctype : 'Back End',
                videos : 40,
                author : 'Vivek Pandey',
                active : false
            })

            const mongoosePlaylist = new Playlist( {
                name : 'Mongoose',
                ctype : 'DataBase',
                videos : 10,
                author : 'Vivek Pandey',
                active : true
            })

            const mongoDBPlaylist = new Playlist( {
                name : 'mongoDB',
                cytpe : 'DataBase',
                videos : 20,
                author : 'Vivek Pandey',
                active : false
            })
            const result = await Playlist.insertMany([jsPlaylist, mongoDBPlaylist, mongoosePlaylist, ExpressPlaylist, reactPlaylist])
            console.log(result)
        }catch (e) {
            console.log(error)
        }
    }
    
    
    createDocument()

    console.log('working with mongoose')
}


// creating Document



connection();
