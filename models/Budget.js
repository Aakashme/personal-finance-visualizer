import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;