const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
   destination: (req, file, cb) =>{
    cb(null, "./images/");
  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/add-product', upload.single("image"),async (req, res) => {
   const {title, description, price, discountedprice} = req.body;
   const image = req.file.filename

   if( !title || !description || ! price || ! discountedprice || !image )
   {
    res.json({
        success:false,
        message:"fill all details"
      })
   }

    try {
        const product = await Product.create({ title, description, price, discountedprice, image:image})
        res.json({
          success: true,
          product
        })
    } catch (error) {
      console.log("error")
    }
  });
  

module.exports = router;