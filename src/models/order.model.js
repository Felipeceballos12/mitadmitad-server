const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  restaurant: {
    type: String,
    required: [true, 'Please enter the restaurant name'],
  },
  totalToPay: {
    type: Number,
    required: [true, 'Pleaase enter the total amount to pay'],
  },
  totalPaid: { type: Number, default: 0 },
  products: [{ name: String, price: Number }],
  timestamp: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
