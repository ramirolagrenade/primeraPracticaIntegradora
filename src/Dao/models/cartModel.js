import mongoose from "mongoose"

const collection = "carts"

const cartSchema = mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
})

const cartModel = mongoose.model(collection, cartSchema)

export default cartModel