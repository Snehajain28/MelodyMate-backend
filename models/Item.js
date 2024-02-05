const mongoose = require ('mongoose')

const ItemSchema = new mongoose.Schema({
  image:{
    type:String
  },
 price:{
    type:String
  },
  tilte:{
    type:String, 
  },
  quantity:{
    type:String, 
  },

});

module.exports= mongoose.model('Item', ItemSchema);