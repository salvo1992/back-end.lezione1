const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const connectToDatabase = require("./db");
require('dotenv').config();


const userRoute=require('./router/user');
const booksRoute=require('./router/books');


const PORT=9099;

const app = express();


app.use(express.json());
app.use(cors());

app.use('/',userRoute);
app.use('/',booksRoute);

//connessione al database

connectToDatabase();




app.listen(PORT, ()=>console.log(`server connected and listening on port ${PORT}`));   