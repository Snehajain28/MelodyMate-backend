const Song = require("../models/Song");

exports.AddSongController = async (req, res) => {
  try {
      const { title, imageUrl, audioUrl } = req.body;
      if (!title || !imageUrl || !audioUrl) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }  

      const existSong = await Song.findOne({ imageUrl })
      if (existSong) {
         return res.json({
            success: true,
           
         })
      }
      const newSong= await Song.create({title:title,audioUrl:audioUrl,imageUrl:imageUrl })

      return res.json({
         success: true,
         newSong,
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
         allItems,
      })
   }
   catch (e) {
      console.log(e)
   }
}


exports.getAllSongController = async (req, res) => {
   try {
      const data = await Song.find({})

      return res.json({
         success: true,
         data,
      })
   }
   catch (e) {
      console.log(e)
   }
}
