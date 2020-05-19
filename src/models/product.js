const mongoose = require('mongoose')
const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('price must be a positive number')
            }
        }
    },
    category: {
        type: String,
        enum: ['mobiles', 'mobile accessories', 'laptop', 'laptop accessories']
    },
    description: {
        type: String,
        required: true
    },
    specification: [{
        type: Object,
    }],
    warranty: {
        type: String,
        default: "nill"
    },
    picture: {
        type: Buffer
    },
    in_stock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('quantity must be a positive number')
            }
        }
    }


    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]

}, {
    timestamps: true
})


const Product = mongoose.model('Product', productschema)


module.exports = Product