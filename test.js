import mongoose from 'mongoose';

const uri = 'mongodb+srv://aakash:Mehta3105@cluster0.qlihv.mongodb.net/personal-finance?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  const budgetSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
  });

  const Budget = mongoose.model('Budget', budgetSchema);

  const newBudget = new Budget({
    category: 'Transportation',
    amount: 600,
  });

  newBudget.save()
    .then((doc) => {
      console.log('Budget saved:', doc);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error saving budget:', err);
      mongoose.connection.close();
    });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});