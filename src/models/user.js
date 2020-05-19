const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLocaleLowerCase().includes('password')) {
                throw new Error('password cannot contains password')
            }
        }

    },

    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be a positive number')
            }
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    profile_picture: {
        type: Buffer,
    },
    cart: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        total: {
            type: Number
        }
    }]

}, {
    timestamps: true
})

// to hide password and token
userschema.methods.toJSON = function() {
        const user = this
        const userobject = user.toObject()
        delete userobject.password
        delete userobject.tokens
        delete userobject.avatar
        return userobject

    }
    //genetate json web token
userschema.methods.generatetoken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.jwt_secret)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// login
userschema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('error:unable to log in no user exist')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('error:unable to log in password not match')
    }
    return user
}


//hash passwors
userschema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() // to get out of pre
})



const User = mongoose.model('User', userschema)


module.exports = User