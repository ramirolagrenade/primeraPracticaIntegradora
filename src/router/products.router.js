import { Router } from "express"
import ProductMongo from "../Dao/mongoDb/productMongo.js"
import productModel from "../Dao/models/productModel.js"

const router = Router()

const productMongo = new ProductMongo()

router.get('/', async (req, res) => {

    // const result = await productMongo.getProducts()

    const { page = 1 } = req.query
    //pongo 5 en limit en vez de 10 debido a que no carge tantos productos!!!!!!!!!!!!!.
    const { limit = 5 } = req.query
    const { sort = 0} = req.query
    const { query } = req.query
    const { stock } = req.query

    if (query) {

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productModel.paginate({ category: query }, { limit, sort: { price: sort }, page, lean: true })

        const products = docs

        if (page > totalPages || page < 1) {
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        if(!parseInt(page)){
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        res.render('products', {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            sort,
            query
        })

    } else if (stock) {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productModel.paginate({ stock: stock }, { limit, sort: { price: sort }, page, lean: true })

        const products = docs

        if (page > totalPages || page < 1) {
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        if(!parseInt(page)){
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        res.render('products', {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            sort,
            stock
        })
    }
    else {

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productModel.paginate({}, { limit, sort: { price: sort }, page, lean: true })

        const products = docs

        if (page > totalPages || page < 1) {
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        if(!parseInt(page)){
            res.status(404).send({
                status: 'Error, Pagina no encontrada'
            })
        }

        res.render('products', {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            sort,
            query
        })

    }

    // res.status(result.code).send({
    //     status: result.status
    // })

})

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid

    const result = await productMongo.getProduct(pid);

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

router.post('/', async (req, res) => {
    const { title, description, price, stock, category, thumbnails } = req.body

    if (!title || !description || !price || !stock || !category) {
        return res.status(400).send({
            error: 'Datos incompletos'
        })
    }

    const newProduct = {
        title,
        description,
        price,
        stock,
        category,
        thumbnails
    }

    const result = await productMongo.addProduct(newProduct)

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })

})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid

    const { title, description, code, price, stock, category, thumbnails } = req.body

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({
            error: 'Datos incompletos'
        })
    }

    const product = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    }

    const result = await productMongo.updateProduct(pid, product)

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid

    const result = await productMongo.deleteProduct(pid)

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

export default router