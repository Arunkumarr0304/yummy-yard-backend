import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  time: { type: String, default: '' },
  spiciness: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  initials: { type: String, required: true },
  avatarColor: { type: String, required: true },
  orderNumber: { type: String, required: true, unique: true },
  orderType: { type: String, enum: ['Dine in', 'Take away', 'Delivery'], default: 'Dine in' },
  status: { 
    type: String, 
    enum: ['all', 'canceled', 'waiting', 'ready', 'completed'], 
    default: 'waiting' 
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
