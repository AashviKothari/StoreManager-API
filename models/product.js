const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Product name required']
    },

    price:{
        type:Number,
        required:[true,'Price is a must to add']
    },

    featured:{
        type:Boolean,
        default: false,
    },

    ratings:{
        type:Number,
        default:4
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },

    company:{
        type:String,
        enum:{
            values: ['ikea','marcos','liddy','caressa'],
            message: '{Value} is not supported'
        }
    }

})

module.exports = mongoose.model('Product',productSchema)