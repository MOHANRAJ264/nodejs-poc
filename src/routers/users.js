const express = require('express')
const {
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
    //testfun
 
} = require('../controlers/user')
const auth = require('../middleware/auth')


const router = new express.Router()

const multer = require('multer');  //to insert image and documents
const sharp = require('sharp'); // resize image and validation
//const welcomeemail = require('../emails/account')

router.post('/api/users/signup', createuser)
router.post('/api/users/login', loginuser)
router.post('/api/users/logout', auth, logoutuser)
router.post('/api/users/logout-all-device', auth, logoutuseralldevice)
router.get('/api/users/profile', auth, userprofile)
router.patch('/api/users/editprofile', auth, editprofile)
router.delete('/api/users/delete-account', auth, deleteaccount)
router.patch('/api/users/addcart', auth, addcart)
router.get('/api/users/mycart', auth, mycart)
router.patch('/api/users/clearcart', auth, clearcart)
router.patch('/api/users/removecart', auth, removecart)


router.post('/api/users/profile_picture/change', auth, upload.single('profile_picture'), addpicture)

//router.post('/api/user/testfun',testfun);





module.exports = router