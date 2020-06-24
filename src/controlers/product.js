const Product = require('../models/product')
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const newproduct = async(req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send(product)

    } catch (e) {
        res.status(400).send(e)

    }

}

const upload = multer({
    //dest:'avatars', // save locally in vs code
    limits: {
        fileSize: 1000000 //1mb
    },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith('jpg') || file.originalname.endsWith('jpeg') || file.originalname.endsWith('png')) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('please upload a jpg, jpeg or png file'))
        }
        cb(undefined, true)
    }
})
const addpictures = async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    try {
        const product = await Product.findById(req.body.id)
        console.log(product)
        if (!product) {
            return res.status(400).send()
        }
        product.picture = buffer
        await product.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
}
const getallproducts= async(req,res)=>{
    const products= await Product.find({})
    try{
        res.status(200).send(products)
    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    newproduct,
    addpictures,
    upload,
    getallproducts

}