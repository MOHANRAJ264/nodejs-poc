const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const express = require('express')
const mongoose = require('mongoose')


const neworder = async(req, res) => {

    const id = req.user.id

    const neworder = new Order()
    neworder.owner = id
    for (let i = 0; i < req.user.cart.length; i++) {
        const _id = req.user.cart[i].product_id
        const quantity = req.user.cart[i].quantity
        await Product.findById({ _id }, async(err, product) => {
            if (err) {
                return res.status(404).send('no')
            }
            if (quantity > product.quantity) {
                return res.status(404).send('no stock available try for less quantity')
            }
            neworder.order.push({
                item: req.user.cart[i].product_id,
                quantity: req.user.cart[i].quantity,
                price: req.user.cart[i].price,
                total: req.user.cart[i].total,
                name:req.user.cart[i].name

            })
            const quant = product.quantity - quantity
            await Product.findByIdAndUpdate({ _id }, { $set: { quantity: quant } }, async(err, prod) => {
                if (prod.quantity - quantity === 0) {
                    console.log(prod)
                    await Product.findOneAndUpdate({ _id }, { $set: { in_stock: false } })
                }
            })


        })

        
    }
    try {
        req.user.cart = new Array()

        await req.user.save()
        if (!neworder.order.length > 0) {
            return res.status(400).send('error:no item in cart')
        }
        await neworder.save()
        res.status(201).send(neworder)

    } catch (e) {
        res.status(400).send()
    }

}

const myorder = async(req, res) => {
    await Order.find({ owner: req.user._id }, (err, prod) => {
        if (err) {
            res.status(400).send('error:no orders placed yet')
        }
        res.status(200).send(prod)
    })

}
const deleteorders = async(req, res) => {
    await Order.deleteMany({ owner: req.user._id }, (err, prod) => {
        if (err) {
            return res.status(500).send('error:server error')
        }
        if (!prod) {
            return res.status(400).send('error: no oreders plaed yet')
        }
        res.status(200).send(prod)
    })

}

module.exports = {
    neworder,
    myorder,
    deleteorders

}