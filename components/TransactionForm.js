import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, MenuItem, Button, Container, Typography } from '@mui/material';
import { categories } from '../utils/categories';

export default function TransactionForm({ transaction = null, refreshData }) {
  const router = useRouter();
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [date, setDate] = useState(transaction ? transaction.date : '');
  const [description, setDescription] = useState(transaction ? transaction.description : '');
  const [category, setCategory] = useState(transaction ? transaction.category : categories[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/transactions${transaction ? `/${transaction._id}` : ''}`, {
      method: transaction ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, date, description, category }),
    });

    if (res.ok) {
      refreshData();
      router.push('/');
    } else {
      console.error('Error submitting form');
      const errorData = await res.json();
      console.error('Error details:', errorData);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {transaction ? 'Edit' : 'Add'} Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {transaction ? 'Edit' : 'Add'} Transaction
        </Button>
      </form>
    </Container>
  );
}
