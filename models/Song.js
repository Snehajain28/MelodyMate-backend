const mongoose = require ('mongoose')

const SongSchema = new mongoose.Schema({
    title:{
        type:String
      },
      imageUrl:{
        type:String
      },
      audioUrl:{
        type:String
      },
});

module.exports= mongoose.model('Song', SongSchema);