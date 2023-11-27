const express = require('express');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/create-checkout-session', async (req, res) => {
    const session = await Stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
                currency: "usd",
                product_data: {
                  name: "Auction Payment",
                },
                unit_amount: 2000, // Convert to cents
              },
              quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/stripe/stripe-webhook',
      cancel_url: `${process.env.CLINT_URL}/cancel`,
    //   success_url: `${process.env.CLIENT_URL}/checkout-success`,
    //   cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });
  
    res.send({url: session.url})
  });
  router.get('/stripe-webhook', async (req, res) => {
    const stripeEvent = req.body;
  
    try {
      if (stripeEvent.type === 'checkout.session.completed') {
        const sessionId = stripeEvent.data.object.id;
        // Lấy thông tin chi tiết của phiên thanh toán từ sessionId
        const session = await Stripe.checkout.sessions.retrieve(sessionId);
  
        // Lấy thông tin liên quan từ session và lưu vào MongoDB
        const auctionId = session.metadata.auctionId;
        const userId = session.metadata.userId;
        const bidAmount = session.amount_total / 100; // Chuyển đổi từ cents sang đơn vị tiền tệ
  
        // Lưu thông tin thanh toán vào MongoDB
        await savePaymentInfo(auctionId, userId, bidAmount);
      }
  
      res.redirect(`${process.env.CLIENT_URL}/success`);
    } catch (error) {
      console.error("Stripe webhook error:", error);
      res.status(500).send("Webhook Error");
    }
  });
    module.exports = router;