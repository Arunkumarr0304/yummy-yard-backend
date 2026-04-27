import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  initials: { type: String, required: true },
  tableNumber: { type: String, required: true },
  orderNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['completed', 'pending', 'cancelled'], 
    default: 'pending' 
  },
  itemCount: { type: Number, default: 0 },
  tableInfo: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
