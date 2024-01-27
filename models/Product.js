const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String
      },
      description:{
        type:String
      },
      price:{
        type:String
      },
      discountedprice:{
        type:String
      },
      image:{
        type:String
      },
});

module.exports= mongoose.model('Product', productSchema);