require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const userrouter = require('./routers/users')
const Product = require('./models/product')
const productrouter = require('./routers/products')
const Order = require('./models/order')
const orderrouter = require('./routers/orders')
const app = express()


app.use(express.json())
app.use(userrouter)
app.use(productrouter)
app.use(orderrouter)

module.exports = app