import express from 'express' 
import handlebars from 'express-handlebars'
import __dirname from './utils.js' 
import mongoose from 'mongoose'
import cartRouter from './router/carts.router.js'
import productRouter from './router/products.router.js'
import messageRouter from './router/message.router.js'
import viewRouter from './router/router.views.js'

const PORT = 8080 
const MONGO = 'mongodb+srv://ramirolagrenade:8MI6v3LKbJK12lLw@ecommerce.24fvet8.mongodb.net/rl' 

const app = express() 

const connection = mongoose.connect(MONGO) 

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use('/', viewRouter)
app.use('/carts', cartRouter)
app.use('/chat', messageRouter)
app.use('/products', productRouter)


app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT) 
})