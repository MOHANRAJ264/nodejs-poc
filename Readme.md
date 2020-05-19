### _____________________________________________Nodejs Ecommerce___________________________________________ ###


### Requirements
```
1. VS code
2. Postman 
3. Node 
4. MongoDB Compass
```
### Instructions
Open the project in VS Code, and navigate to config folder. Open the dev.env in the editor:

Add mongodb URL:
```
 MONGODATABSE:  e.g. mongodb://127.0.0.1:27017/poc
```
Add Port:
```
 PORT:  e.g. 3000
```
 Provide a secret key:
 ```
 jwt_secret:  e.g. helloworld
 ```
 
## Running the application

 Now that we are set. Open project in terminal, and:
 ```
 npm install (this will install all dependencies)
 ```
 
 Once all dependencies are installed
 ```
 npm run dev
 ```
 
 aggg!! Project does not run
 ```
 * If using MongoDB locally, make sure it is running as well.
 ```

 To stop ecexution
 ```
   ctrl+c
```

Use the below Public link to access my POSTMAN Collection
```
    https://www.getpostman.com/collections/c79e9fc51bdb52cdd507
```
 
 
### Testing 
 
 To run tests, run ```npm test```
 The environmental values for testing is saved in test.env
 Install jest and supertest 
 
### EXPRESS API TO RUN IN POST MAN
 USER 
 ```
    router.post('/api/users/signup', createuser)
        // to sign up a new user
    router.post('/api/users/login', loginuser)      
        // login for existing user
    router.post('/api/users/logout', auth, logoutuser)  
        //logout current user
    router.post('/api/users/logout-all-device', auth, logoutuseralldevice) 
        //logout all device of a user
    router.get('/api/users/profile', auth, userprofile)
        // to display user profile
    router.patch('/api/users/editprofile', auth, editprofile)
       //to edit current user ptofile 
    router.delete('/api/users/delete-account', auth, deleteaccount)
        //to delete current user account
    router.patch('/api/users/addcart', auth, addcart)
        //add products to user cart
    router.get('/api/users/mycart', auth, mycart)
        //to display current user cart
    router.patch('/api/users/clearcart', auth, clearcart)
        //to clear current user cart
    router.post('/api/users/profile_picture/change', auth, upload.single('profile_picture'), addpicture)
        //to upload a profile picture for user
```

PRODUCT
```
    ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    NOTE:
        There is no seperate authentication for product. These below routers are not shared with the clients. 
    ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    router.post('/api/admim/product/add', newproduct)
        //to post a new product
    router.post('/api/admin/product/addpicture', upload.single('picture'), addpictures)
        //to add a picture for a product 
```
ORDER
```
    router.post('/api/users/add-order', auth, neworder)
        //to place a new order. The items in cart will be added in order
    router.get('/api/users/my-order', auth, myorder)
        //to see users order history
    router.delete('/api/users/clear-order', auth, deleteorders)
        //to delete all user order records
```



