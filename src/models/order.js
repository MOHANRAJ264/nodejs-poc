const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderschema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },

    order: [{
        item: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    }]

}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderschema)


module.exports = Order