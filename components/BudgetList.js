import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function BudgetList({ budgets, refreshData }) {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Budget List
      </Typography>
      <List>
        {budgets.map((budget) => (
          <ListItem key={budget._id} divider>
            <ListItemText
              primary={budget.category}
              secondary={`$${budget.amount}`}
            />
            <div>
              <Link href={`/edit-budget/${budget._id}`}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={async () => {
                  const res = await fetch(`/api/budgets/${budget._id}`, {
                    method: 'DELETE',
                  });
                  if (res.ok) {
                    refreshData();
                  } else {
                    console.error('Error deleting budget');
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
