const Order = require('../models/order.model.js');
const generateQRCode = require('../generateQRCode.js');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await Order.findById(id);
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    console.log(order);

    const qrCode = await generateQRCode(order.id);

    if (qrCode.hasError) {
      res.status(204).json({ message: qrCode.message });
      return;
    }

    res.send(`<img src="${qrCode.data}" alt="QR Code"/>`);
    //res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  updateOrder,
  createOrder,
};
