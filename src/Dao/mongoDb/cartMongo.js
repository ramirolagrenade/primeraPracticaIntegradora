import cartModel from "../models/cartModel.js"

export default class CartMongo {

    // constructor(path){
    //     this.path = path 
    // }

    async addCart() {

        const cart = await cartModel.create({})

        return {
            code: 202,
            status: 'Success',
            message: cart
        }

    }

    async getCart(cid) {

        const cart = await cartModel.findOne({ _id: cid })

        if (!cart) {
            return {
                code: 400,
                status: 'Error',
                message: 'No se ha encontrado un cart con ese ID'
            }
        }

        return {
            code: 202,
            status: 'Success',
            message: cart.products
        }
    }

    async updateCart(cid, pid) {

        const cart = await cartModel.findOne({ _id: cid })

        const prodIndex = cart.products.findIndex(i => i._id === pid)

        if (prodIndex === -1) {
            const product = {
                _id: pid,
                quantity: 1
            }
            cart.products.push(product)
        }
        else {
            let total = cart.products[prodIndex].quantity
            cart.products[prodIndex].quantity = total + 1
        }

        const result = await cartModel.updateOne({ _id: cid }, { $set: cart })

        return {
            code: 202,
            status: 'Success',
            message: cart.products
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


}