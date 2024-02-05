const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  status: {
    type: String,
  },
  amount: {
    type: String,
  }


});

module.exports = mongoose.model('Order', OrderSchema);