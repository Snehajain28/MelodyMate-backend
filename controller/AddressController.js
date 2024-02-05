const Address = require("../models/Address");
const User = require('../models/User')


exports.AddAddressController = async (req, res) => {

   try {
      const { email, address, city, name, phone, state, zip } = req.body;

      if (!email || !address || !city || !name || !phone || !state || !zip) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }

      const user = await User.findOne({ email })

      const add = await Address.create({ email, address, city, name, phone, state, zip })

      const newaddress = await User.findByIdAndUpdate({ _id: user._id },
         { $push: { addresses: add._id } },
         { new: true })

      return res.json({
         success: true,
         newaddress

      })
   }
   catch (e) {
      console.log("adding address error error")
      console.log(e)
   }

}

exports.AddressController = async (req, res) => {

   try {
      const { email } = req.body;

      if (!email) {
         return res.json({
            success: false,
            message: "fill all data "
         })
      }


      const user = await User.findOne({ email })

      let temp = user.addresses.length;
      let allAddress = [];

        for (let i = 0; i < temp; i++) {
            const id = user.addresses[i];
            const data = await Address.findById({ _id: id })
            allAddress.push(data)

         }
      
   return res.json({
         success: true,
         user,
         allAddress
      })
   }
   catch (e) {
      console.log("adding address error error")

   }

}