const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')
const mongoose = require('mongoose')

const express = require('express')
const sharp = require('sharp');
const multer = require('multer');

const createuser = async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generatetoken()
        res.status(201).send({ user, token })

    } catch (e) {
        res.status(400).send(e)

    }

}
const loginuser = async(req, res) => { console.log({b:req.body,h:req.headers})
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generatetoken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send('error:invalid credentials')
    }
}
const logoutuser = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('success')
    } catch (e) {
        res.status(500).send('error:unable to logout')
    }
}
const logoutuseralldevice = async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('success')
    } catch (e) {
        res.status(500).send('error:unable to logout all devie')
    }
}
const userprofile = async(req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send('error:unable to fetch user')
    }
}
const editprofile = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age', 'gender', 'address']
    const isvalidoperation = updates.every((update) => {
        return allowedupdates.includes(update)
    })
    if (!isvalidoperation) {
        return res.status(400).send('error:invalid update')
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send('error:unable to update profile')
    }
}
const deleteaccount = async(req, res) => {
    try {
        await Order.deleteMany({ owner: req.user._id })
        await req.user.remove()
        res.status(200).send('success')
    } catch (e) {
        res.status(500).send('error:unable to delete account')
    }
}
const addcart = async(req, res) => {
    const _id = mongoose.Types.ObjectId(req.body.prodid)
    const quantity = req.body.quantity
    const userId = mongoose.Types.ObjectId(req.user._id)
    await Product.findById({ _id }, (err, product) => {

        if (err) {
            return res.status(404).send('error:unable to find product')
        }
        if (!product) {
            return res.status(404).send('error:no such product')
        }
        if (quantity > product.quantity) {
            return res.status(404).send('error:no stock available try for less quantity')
        }
         let check=false
        // req.user.cart.map(item=>{
        // //console.log(item.product_id.toString())
        // if(item.product_id.toString()==product._id.toString())
        //     check=true
        //     console.log(check)
        
        // })
console.log(product)
        for(let i=0 ; i<req.user.cart.length;i++){
           if(product._id.toString()==req.user.cart[i].product_id.toString()){
               if(quantity===1){
            req.user.cart[i].quantity=req.user.cart[i].quantity+1
            req.user.cart[i].total=req.user.cart[i].quantity * product.price
               }
               if(quantity === -1){
            req.user.cart[i].quantity=req.user.cart[i].quantity-1
            req.user.cart[i].total=req.user.cart[i].quantity * product.price
               }
            check=true
            //User.findByIdAndUpdate({_id:userId},{$set:{"cart.quantity":req.user.cart[i].quantity+1}})
                //console.log(check)
            }
        }
        if(check=== false){
        req.user.cart.push({
            product_id: product._id,
            name:product.name,
            quantity: quantity,
            price: product.price,
            total: (product.price * quantity)
        });
    }
    })
    try {
        await req.user.save()
        res.status(200).send(req.user.cart)
    } catch (e) {
        res.status(400).send()
    }
}




const mycart = async(req, res) => {
    try {
        res.status(200).send(req.user.cart)
    } catch (e) {
        res.ststus(400).send('error:unable to fetch your cart')
    }

}

const removecart = async (req,res)=>{
    const userId = mongoose.Types.ObjectId(req.user._id)
    const prodId = mongoose.Types.ObjectId(req.body._id)
  await  User.updateOne( {_id:userId}, { $pull: {"cart": {"product_id":prodId} } } )
  try{
      res.status(200).send(req.user.cart)
  }catch(error){
      res.status(400).send(error)
  }
}
const clearcart = async(req, res) => {
    req.user.cart = new Array()
    try {
        await req.user.save()
        res.status(200).send('success')
    } catch (e) {
        res.status(400).send('error:unable to clear cart')
    }
}

const upload = multer({
    limits: {
        fileSize: 2000000 //2mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('please upload a jpg, jpeg or png file'))
        }
        cb(undefined, true)
    }
})
const addpicture = async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    try {
        req.user.profile_picture = buffer
        await req.user.save()
        res.status(201).send('success')
    } catch (e) {
        res.status(400).send('error:unable to add picture')
    }
}

// const testfun = (req, res) =>{
//     console.log(req.body);
//     const { Authorization } = req.headers;
//     res.status(200).json({name:"test"});
// }

module.exports = {
    
    createuser,
    loginuser,
    logoutuser,
    logoutuseralldevice,
    userprofile,
    editprofile,
    deleteaccount,
    addcart,
    mycart,
    clearcart,
    upload,
    addpicture,
    removecart

}