const mongoose = require('mongoose')
const {Schema} = mongoose;

const itemSchema = new Schema({
    name: String,
    price: Number
})

const receiptInfoSchema = new Schema({
    merchant: String,
    totalPrice: Number,
    items: [itemSchema],
    date: Date
})

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    budget: Number,
    receipts: [receiptInfoSchema], // Reference to Receipt model
    // ...other user fields

})


const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Receipt = mongoose.model('Receipt', receiptInfoSchema);

module.exports = {
    User,
    Item,
    Receipt
};