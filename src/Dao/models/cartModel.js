import mongoose from "mongoose"

const collection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                stock: Number
            }
        ]
    },
    default: []
})

const cartModel = mongoose.model(collection, cartSchema)

export default cartModel