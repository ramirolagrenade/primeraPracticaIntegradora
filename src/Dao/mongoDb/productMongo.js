import productModel from "../models/productModel.js"

export default class ProductMongo {

    getProducts = async () => {

        const carts = await productModel.find()

        return {
            code: 202,
            status: 'Success',
            message: carts
        }
    }

    getProduct = async (pid) => {
        const product = await productModel.findOne({ _id: pid })

        if (!product) {
            return {
                code: 400,
                status: 'Error',
                message: 'No se ha encontrado un cart con ese ID'
            }
        }

        return {
            code: 202,
            status: 'Success',
            message: product
        }
    }

    addProduct = async (newProduct) => {

        const product = await productModel.create(newProduct)

        try {

            return {
                code: 202,
                status: 'Success',
                message: product
            }

        }
        catch (error) {
            return {
                code: 400,
                status: 'Error',
                manssage: 'Producto no creado'
            }
        }
    }

    deleteProduct = async (id) => {
        const product = await productModel.deleteOne({ _id: id })

        try {
            return {
                code: 202,
                status: 'Success',
                message: product
            }
        }
        catch (error) {
            return {
                code: 400,
                status: 'Error',
                message: 'id no encontrado'
            }
        }

    }

    updateProduct = async (IdProducto, data) => {
        try {
            const product = await productModel.updateOne({_id : IdProducto}, {data})

            return {
                code: 200,
                status: 'Success',
                message: product
            }
        } catch (error) {
            return {
                code: 400,
                status: 'Error',
                message: 'No actualizado'
            }
        }
    }
}