const express = require('express')
const router = new express.Router()
const { newproduct, upload, addpictures } = require('../controlers/product')



router.post('/api/admim/product/add', newproduct)
router.post('/api/admin/product/addpicture', upload.single('picture'), addpictures)



module.exports = router