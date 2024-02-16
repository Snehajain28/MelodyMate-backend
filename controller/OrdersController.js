const Address = require("../models/Address");
const User = require('../models/User')
const Item = require('../models/Item')
const Order = require('../models/Order')


exports.AddOrderController = async (req, res) => {

   try {
      const { id, cartData, addId, totalAmt } = req.body;
      if (!id || !cartData || !addId || !totalAmt) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }

      const newOrder = await Order.create({ address: addId, amount: totalAmt })

      cartData.map(async (data) => {
         const existItem = await Item.findOne({ image })
         if (!existItem) {
           existItem= await Item.create({ image: data.image, price: data.price, title: data.title, quantity: data.quantity, discountedPrice: data.discountedPrice, brand: data.brand })
         }
         await Order.findByIdAndUpdate({ _id: newOrder._id },
            { $push: { items: existItem._id } },
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
         allOrders[i].items = arr;
      }

      return res.json({
         success: true,
         allOrders,
      })
   }
   catch (e) {
      console.log(e)
   }
}


exports.getAllOrdersController = async (req, res) => {
   try {
      const data = await Order.find({})

      for (let i = 0; i < data.length; i++) {
         let arr = [];
         for (let j = 0; j < data[i].items.length; j++) {
            arr.push(await Item.findById({ _id: data[i].items[j] }))
         }
         data[i].items = arr;
      }

      return res.json({
         success: true,
         data,
      })
   }
   catch (e) {
      console.log(e)
   }

}

exports.getSingleOrderController = async (req, res) => {

   const { id } = req.body;
   try {
      const data = await Order.findById({ _id: id })
      data.address = await Address.findById({ _id: data.address })

      let arr = [];
      for (let j = 0; j < data.items.length; j++) {
         arr.push(await Item.findById({ _id: data.items[j] }))
      }
      data.items = arr;
      return res.json({
         success: true,
         data,
      })
   }
   catch (e) {
      console.log(e)
   }

}