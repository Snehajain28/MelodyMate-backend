const Address = require("../models/Address");
const User = require('../models/User')
const Item = require('../models/Item')
const Order = require('../models/Order')


exports.AddOrderController = async (req, res) => {

   try {
      const { id, cartData, addId } = req.body;
      if (!id || !cartData || !addId) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }

      const newOrder = await Order.create({ address: addId })

      cartData.map(async (data) => {
         const newItem = await Item.create({ image: data.image, price: data.price, title: data.title, quantity: data.quantity })
         await Order.findByIdAndUpdate({ _id: newOrder._id },
            { $push: { items: newItem._id } },
            { new: true })
      })

      await User.findByIdAndUpdate({ _id: id },
         { $push: { orders: newOrder._id } },
         { new: true })

      return res.json({
         success: true,
         newOrder,
      })
   }
   catch (e) {
      console.log(e)
   }

}


exports.OrderController = async (req, res) => {

   try {
      const { id } = req.body;

      if (!id) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }

      const user = await User.findById({ _id: id })
      let allOrders = [];
       let allItems = [];
      const len = user.orders.length
      for (let i = 0; i < len; i++) {
         const data = await Order.findById({ _id: user.orders[i] })
         allOrders.push(data);
      }
      for (let i = 0; i < len; i++) {
         const data = await Address.findById({ _id: allOrders[i].address })
         allOrders[i].address = data
      }

      for (let i = 0; i < allOrders.length; i++) {
         let arr = [];
         for (let j = 0; j < allOrders[i].items.length; j++) {
          arr.push(await Item.findById({ _id: allOrders[i].items[j] }))
         }
         allOrders[i].items=arr;
      }   

      return res.json({
         success: true,
         allOrders,
         allItems,
      })
   }
   catch (e) {
      console.log(e)
   }
}