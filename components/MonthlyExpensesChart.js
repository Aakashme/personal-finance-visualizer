import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography } from '@mui/material';

export default function MonthlyExpensesChart({ transactions }) {
  const groupedTransactions = transactions.reduce((acc, curr) => {
    const monthYear = new Date(curr.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    acc[monthYear] = (acc[monthYear] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.keys(groupedTransactions).map((key) => ({
    name: key,
    expenses: groupedTransactions[key],
  }));

  return (
    <Container maxWidth="md">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expenses" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
