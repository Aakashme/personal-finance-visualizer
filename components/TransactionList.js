import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function TransactionList({ transactions, refreshData }) {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Transaction List
      </Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction._id} divider>
            <ListItemText
              primary={transaction.description}
              secondary={`$${transaction.amount} - ${new Date(transaction.date).toLocaleDateString()} - ${transaction.category}`}
            />
            <div>
              <Link href={`/edit/${transaction._id}`}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={async () => {
                  const res = await fetch(`/api/transactions/${transaction._id}`, {
                    method: 'DELETE',
                  });
                  if (res.ok) {
                    refreshData();
                  } else {
                    console.error('Error deleting transaction');
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
