import mongoose from 'mongoose';
import Budget from '../../../models/Budget';

export default async function handler(req, res) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    switch (req.method) {
      case 'GET':
        try {
          const budgets = await Budget.find({});
          res.status(200).json(budgets);
        } catch (error) {
          console.error('Error fetching budgets:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      case 'POST':
        try {
          const { category, amount } = req.body;
          console.log('Received budget data:', category, amount);
          const budget = new Budget({ category, amount });
          await budget.save();
          res.status(201).json(budget);
        } catch (error) {
          console.error('Error saving budget:', error);
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