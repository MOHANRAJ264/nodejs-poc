const express = require('express')
const router = new express.Router()
const { newproduct, upload, addpictures ,getallproducts} = require('../controlers/product')



router.post('/api/admim/product/add', newproduct)
router.get('/api/product/all', getallproducts)
router.post('/api/admin/product/addpicture', upload.single('picture'), addpictures)



module.exports = router