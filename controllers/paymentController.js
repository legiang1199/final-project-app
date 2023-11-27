const Payment = require("../database/models/Payment");
const Auction = require("../database/models/Auctions");

const savePaymentInfo = async (auctionId, userId, bidAmount) => {
    const payment = new Payment({
        auction: auctionId,
        user: userId,
        amount: bidAmount,
    });
    
    await payment.save();
    }

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId);
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    savePaymentInfo,
    getAllPayments,
    getPaymentById,
};
