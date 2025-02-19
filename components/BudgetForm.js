import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, MenuItem, Button, Container, Typography } from '@mui/material';
import { categories } from '../utils/categories';

export default function BudgetForm({ budget = null, refreshData }) {
  const router = useRouter();
  const [category, setCategory] = useState(budget ? budget.category : categories[0]);
  const [amount, setAmount] = useState(budget ? budget.amount : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/budgets${budget ? `/${budget._id}` : ''}`, {
      method: budget ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, amount }),
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
        {budget ? 'Edit' : 'Add'} Budget
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {budget ? 'Edit' : 'Add'} Budget
        </Button>
      </form>
    </Container>
  );
}
