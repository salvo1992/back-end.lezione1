const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT=9099;

const app = express();

const userRoute=require('./router/user');

app.use(express.json());

app.use('/',userRoute);


//connessione al database

mongoose.connect(uri='mongodb+srv://salvatoredimaria92:SdrbaQyLiRWYjUMw@databasesalvo.pbepejt.mongodb.net/')

const db =mongoose.connection;
db.on('error',console.error.bind(console,'Db connection error'));

db.once('open',()=>{
    console.log('Database successfully connected!');
})

app.listen(PORT, ()=>console.log(`server connected and listening on port ${PORT}`));   