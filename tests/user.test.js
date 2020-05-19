const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const useroneId = new mongoose.Types.ObjectId()
const userone = {
    _id: useroneId,
    name: 'mike',
    email: "werty@example.com",
    password: "1234567890",
    age: 21,
    ender: "female",
    address: {
        street: "qwert",
        city: "pune",
        state: "maharastra",
        zip: 654321,
    },
    tokens: [{
        token: jwt.sign({ _id: useroneId }, process.env.jwt_secret)
    }]
}
beforeEach(async() => {
    await User.deleteMany()
    await new User(userone).save()
})
test('sign up a new user', async() => {
    await request(app).post('/api/users/signup').send({
        name: "test person",
        email: "test2@gmail.com",
        password: "qwertyuiop",
        age: 20,
        ender: "male",
        address: {
            street: "qwert",
            city: "pune",
            state: "maharastra",
            zip: 123456,
        }
    }).expect(201)
})

test('sign up a new user without proper email', async() => {
    await request(app).post('/api/users/signup').send({
        name: "test person",
        email: "test1",
        password: "qwertyuiop",
        age: 20,
        ender: "male",
        address: {
            street: "qwert",
            city: "pune",
            state: "maharastra",
            zip: 123456,
        }
    }).expect(400)
})

test('user log in', async() => {
    await request(app).post('/api/users/login').send({
        email: userone.email,
        password: userone.password,
    }).expect(200)
})

test('log in not exist', async() => {
    await request(app).post('/api/users/login').send({
        email: "qwert@qwer.com",
        password: userone.password,
    }).expect(400)
})

test('get user profile', async() => {
    await request(app).get('/api/users/profile')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(200)
})

test('try to get user profoile unauthorized', async() => {
    await request(app).get('/api/users/profile')
        .send()
        .expect(401)
})

test('update user profile', async() => {
    await request(app).patch('/api/users/editprofile')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send({ name: "the king" })
        .expect(200)
})

test('update user profile', async() => {
    await request(app).patch('/api/users/editprofile')
        .send({ name: "the king" })
        .expect(401)
})

test('delete current user account', async() => {
    await request(app).delete('/api/users/delete-account')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not delete user for un authenticated', async() => {
    await request(app).delete('/api/users/delete-account')
        .send()
        .expect(401)
})