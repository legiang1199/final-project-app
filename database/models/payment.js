const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    auction: {type: mongoose.Schema.Types.ObjectId, ref: "Auction"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    amount: {type: Number},
    timestamp: Date.now(),
})

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;