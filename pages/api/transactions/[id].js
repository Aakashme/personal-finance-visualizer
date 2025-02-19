import mongoose from 'mongoose';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    switch (req.method) {
      case 'PUT':
        try {
          const { amount, date, description, category } = req.body;
          console.log('Updating transaction data:', amount, date, description, category);
          const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, date, description, category },
            { new: true }
          );
          res.status(200).json(updatedTransaction);
        } catch (error) {
          console.error('Error updating transaction:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      case 'DELETE':
        try {
          const deletedTransaction = await Transaction.findByIdAndDelete(id);
          res.status(200).json(deletedTransaction);
        } catch (error) {
          console.error('Error deleting transaction:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}