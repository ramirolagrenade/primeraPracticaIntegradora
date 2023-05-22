import cartModel from "../models/cartModel.js"

export default class CartMongo {

    // constructor(path){
    //     this.path = path 
    // }

    async addCart(newCart) {

        const cart = await cartModel.create(newCart)

        return {
            code: 202,
            status: 'Success',
            message: cart
        }

    }

    async getCart(cid) {

        const cart = await cartModel.findOne({ _id: cid })

        return {
            cart
        }
    }

    async updateCart(cid, cart) {

        const result = await cartModel.updateOne({ _id: cid }, { $set: cart })

        return {
            code: 202,
            status: 'Success',
            message: result
        }

    }

    async updateStock(cid, pid, stockUp) {

        const cart = await cartModel.find({ $and: [{ products: cid }, { product: pid }] })

        cart.stock = stockUp

        const result = await cartModel.updateOne({ _id: cid }, { $set: cart })

        return {
            code: 202,
            status: 'Success',
            message: result
        }

    }

    async getCarts() {

        const carts = await cartModel.find()

        return {
            code: 202,
            status: 'Success',
            message: carts
        }
    }

    async deleteCarts(id) {
        const carts = await cartModel.deleteOne({ _id: id })

        return {
            code: 202,
            status: 'Success',
            message: carts
        }
    }


}