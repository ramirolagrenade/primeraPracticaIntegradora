import { Router } from 'express'
import CartMongo from '../Dao/mongoDb/cartMongo.js'

const router = Router()
const cartMongo = new CartMongo()

router.post('/', async (req, res) => {
    const result = await cartMongo.addCart()

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const result = await cartMongo.updateCart(cid, pid)

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

router.get('/', async (req, res) => {

    const result = await cartMongo.getCarts()

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

router.get('/:cid', async (req, res) => {
    const cid = (req.params.cid)

    const result = await cartMongo.getCart(cid)

    res.status(result.code).send({
        status: result.status,
        message: result.message
    })
})

export default router 