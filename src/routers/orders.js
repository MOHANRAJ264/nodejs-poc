const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const { neworder, myorder, deleteorders } = require('../controlers/order')



router.post('/api/users/add-order', auth, neworder)

router.get('/api/users/my-order', auth, myorder)
router.delete('/api/users/clear-order', auth, deleteorders)

module.exports = router