const express = require('express');
const Item = require('../models/Item');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },

});

const upload = multer({ storage: storage });

router.post('/add-product', upload.single("image"), async (req, res) => {
  const { name, des, price, discountedprice, qty } = req.body;
  const imagefile = req?.file?.filename


  if (!name || !des || !price || !discountedprice || !qty || !imagefile) {
    res.json({
      success: false,
      message: "fill all details"
    })
  }

  try {
    const product = await Item.create({ tilte: name, des, price, discountedPrice: discountedprice, quantity: qty, imageFile: imagefile })
    res.json({
      success: true,
      product
    })
  } catch (error) {
    console.log("error")
  }
});

module.exports = router;