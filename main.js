const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT=3080;

const app = express();

const userRoute=require('./router/user');

app.use(express.json());

app.use('/',userRoute);

app.get('/getUsers', (req, res) => {
    response
    .status(200)
    .send({
        title:'salvo',
        isServerActive: true
    })
});

//connessione al database

mongoose.connect(uri='mongodb+srv://salvatoredimaria92:SdrbaQyLiRWYjUMw@databasesalvo.pbepejt.mongodb.net/',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db =mongoose.connection;
db.on('error',console.error.bind(console,'Db connection error'));

db.once('open',()=>{
    console.log('Database successfully connected!');
})

app.listen(PORT, ()=>console.log('server connected and listening on port ${PORT}'));