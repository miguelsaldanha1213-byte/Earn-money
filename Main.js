const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const helmet = require('helmet'); // Essential for UK security compliance
const app = express();

app.use(helmet()); // Protects against common web vulnerabilities
app.use(express.json());

app.post('/create-subscription', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_H5ggY9IzvD8', // Create this in your Stripe Dashboard
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://yourgame.co.uk',
      cancel_url: 'https://yourgame.co.uk',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
