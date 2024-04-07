const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToDatabase = require("./db");
const logger= require('./middlewares/logger');
require("dotenv").config();


const userRoute=require('./router/user');
const booksRoute=require('./router/books')
const loginRoute = require('./router/login')

const PORT=9099;
const app = express();


app.use(express.json());
app.use(cors());

app.use(logger);
app.use('/',userRoute);
app.use('/',booksRoute);
app.use('/',loginRoute);
//connessione al database

connectToDatabase()




app.listen(PORT, ()=>console.log(`server connected and listening on port ${PORT}`));   