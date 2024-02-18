
const express = require('express');
const dbconnect = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const cors = require('cors');


require('dotenv').config();
dbconnect();
PORT = process.env.PORT || 8000

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.Origins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,    
    optionsSuccessStatus: 204,
}))         

app.use(`/api/v1/user`, userRoutes)
app.use(`/api/v1/song`, songRoutes)


app.get('/', (req, res) => {
    res.send("hellooo")
})                      

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
})