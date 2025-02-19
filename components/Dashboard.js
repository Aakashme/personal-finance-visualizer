import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CategoryPieChart from './CategoryPieChart';

export default function Dashboard({ transactions }) {
  const totalExpenses = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  const latestTransactions = transactions.slice(-5);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Total Expenses: ${totalExpenses.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CategoryPieChart transactions={transactions} />
        </Grid>
        
      </Grid>
    </Container>
  );
}
