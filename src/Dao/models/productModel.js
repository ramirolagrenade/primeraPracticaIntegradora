import mongoose from "mongoose"

const collection = "products"

const productSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    }, 
    description:{
        type: String,
        require: true
    },
    code:{
        type: Number,
        require: true,
        unique: true
    },
    price:{
        type: Number,
        require: true
    },
    status:{
        default: true
    },
    stock:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    thumbnail:{
        type: String
    },
    id:{
        type: Number,
        require: true,
        unique: true
    }
})

const productModel = mongoose.model(collection, productSchema)

export default productModel