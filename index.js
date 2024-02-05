
const express = require ('express');
const dbconnect = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');


require('dotenv').config();
dbconnect();
PORT=process.env.PORT||8000

const app=express();

app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  }))

app.use(`/api/v1/user`,userRoutes)
app.use(`/api/v1/product`,productRoutes)

app.get('/' , (req,res) => {
    res.send("hellooo")
})

app.listen(PORT , () => {
    console.log(`listening ${PORT}`);
})