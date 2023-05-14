import express from 'express' 
import __dirname from './utils.js' 
import mongoose from 'mongoose'
import cartRouter from './router/carts.router.js'
import productRouter from './router/products.router.js'
import messageRouter from './router/message.router.js'

const PORT = 8080 
const MONGO = 'mongodb+srv://ramirolagrenade:8MI6v3LKbJK12lLw@ecommerce.24fvet8.mongodb.net/rl' 

const app = express() 

const connection = mongoose.connect(MONGO) 
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use('/api/carts', cartRouter)
app.use('/api/chat', messageRouter)
app.use('/api/products', productRouter)


app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT) 
})