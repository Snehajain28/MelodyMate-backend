const express = require ('express');
const dbconnect = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

require('dotenv').config();
dbconnect();
PORT=process.env.PORT||8000


const app=express();

app.use(express.json());
app.use(cors())

app.use('/api/v1/user' ,userRoutes)

app.get('/' , (req,res) => {
    res.send("hefllo")
})

app.listen(PORT , () => {
    console.log(`listening ${PORT}`);
})