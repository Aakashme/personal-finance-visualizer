import mongoose from 'mongoose';
import Budget from '../../../models/Budget';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    switch (req.method) {
      case 'PUT':
        try {
          const { category, amount } = req.body;
          console.log('Updating budget data:', category, amount);
          const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { category, amount },
            { new: true }
          );
          res.status(200).json(updatedBudget);
        } catch (error) {
          console.error('Error updating budget:', error);
          res.status(500).json({ error: error.message });
        }
        break;
      case 'DELETE':
        try {
          const deletedBudget = await Budget.findByIdAndDelete(id);
          res.status(200).json(deletedBudget);
        } catch (error) {
          console.error('Error deleting budget:', error);
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