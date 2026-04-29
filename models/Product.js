import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Main course', 'Appetizer', 'Dessert', 'Beverage', 'Food'], 
    default: 'Food' 
  },
  stock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
