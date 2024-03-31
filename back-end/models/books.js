const mongoose = require('mongoosee');
const{mongo}=require('mongoose');

const BookSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        max:255
    },
    author:{
        type: String,
        required: true,
        max:255
    },
    description:{
        type: String,
        required: true,
        max:255
    },
    editor:{
        type: String,
        required: false,
       default: 'Not available',
    },
    price:{
        type: mongoose.types.Decimal128,
        required: false,
        default: 0.0
    },
    cover:{
        type: String,
        required: false,
        default: 'https://picsum.photos/200/300',
    },
    pubDate:{
        type: Date,
        required: false,
        default: Date.now(),
    },
    isFeatured:{
        type: Boolean,
        required: false,
        default: false
    }
},{timestamps: true,strict: true})

module.exports = mongoose.model('BooksModel', BookSchema,'books')