import mongoose from 'mongoose';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    switch (req.method) {
      case 'GET':
        try {
          const transactions = await Transaction.find({});
          res.status(200).json(transactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      case 'POST':
        try {
          const { amount, date, description, category } = req.body;
          console.log('Received transaction data:', amount, date, description, category);
          const transaction = new Transaction({ amount, date, description, category });
          await transaction.save();
          res.status(201).json(transaction);
        } catch (error) {
          console.error('Error saving transaction:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}