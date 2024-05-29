const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  amount: { type: Number, default: 0, required: false },
  tip: { type: Number, default: 0, required: false },
  timestamp: { type: Date, default: Date.now, required: false },
});

const Products = mongoose.Schema({
  name: String,
  price: Number,
  paid: { type: Boolean, default: false, required: false },
});

const OrderSchema = mongoose.Schema({
  restaurant: {
    type: String,
    required: [true, 'Please enter the restaurant name'],
  },
  payments: [PaymentSchema],
  products: [Products],
  timestamp: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
