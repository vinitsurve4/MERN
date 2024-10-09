const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    sold: Boolean,
    dateOfSale: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
