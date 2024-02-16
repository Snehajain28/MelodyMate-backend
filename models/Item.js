const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  image: {
    type: String
  },
  imageFile: {
    type: String
  },
  price: {
    type: String
  },
  des: {
    type: String
  },
  discountedPrice: {
    type: String
  },
  brand: {
    type: String
  },
  title: {
    type: String,
  },
  quantity: {
    type: String,
  },

});

module.exports = mongoose.model('Item', ItemSchema);