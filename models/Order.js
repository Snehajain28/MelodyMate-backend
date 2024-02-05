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
  amount: {
    type: String,
  },
  orderStatus: {
    type: String,
    default:"created"
  },
  createdAt: {
    type: Date,
    default:Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model('Order', OrderSchema);