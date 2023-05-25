import { Router } from "express"
import ProductMongo from "../Dao/mongoDb/productMongo.js"
import CartMongo from '../Dao/mongoDb/cartMongo.js'


const router = Router()

const productMongo = new ProductMongo()


router.get('/products', async (req, res) => {

    const queryOptions = req.query
    const result = await productMongo.getPaginate(queryOptions)

    const products = result.products
    const hasPrevPage = result.hasPrevPage
    const hasNextPage = result.hasNextPage
    const nextPage = result.nextPage
    const prevPage = result.prevPage
    const totalPages = result.totalPages
    const page = result.page

    if (page > totalPages || page < 1) {
        res.status(404).send({
            status: Error,
            menssage: 'Pagina no encontrada'
        })
    }

    if (!parseInt(page)) {
        res.status(404).send({
            status: Error,
            menssage: 'Pagina no encontrada'
        })
    }

    res.render('products', {
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        totalPages
    })

    
})

router.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid

    const carts = await cartMongo.getCart(cid)

    res.render('carts',{
        carts
    })
})

export default router