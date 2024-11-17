const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: 'rzp_test_d9SMQlvCWU5QsL',
  key_secret: 'SPZ5O9ES8Uw25efTCSQMbGQ8',
});

module.exports = razorpay;
