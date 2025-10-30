const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: Number,
      price: Number
    }
  ],
  shippingAddress: Object,
  paymentMethod: String,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
