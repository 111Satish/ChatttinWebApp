const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  console.log(amount)

  try {
    const order = await razorpay.orders.create({
      "amount": 50000,
      "currency": "INR",
      "receipt": "receipt#1",
      "partial_payment": false,
      "notes": {
        "key1": "value3",
        "key2": "value2"}
    });
    console.log(order)
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ status: 'Payment Verified', razorpay_payment_id });
  } else {
    res.status(400).json({ error: 'Payment Verification Failed' });
  }
};
