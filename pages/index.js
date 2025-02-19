import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import Dashboard from '../components/Dashboard';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import BudgetVsActualChart from '../components/BudgetVsActualChart';
import { AccountBalanceWallet, BarChart, PieChart, TrendingUp } from '@mui/icons-material';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    setBudgets(data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const refreshData = () => {
    fetchTransactions();
    fetchBudgets();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Title */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', display: 'inline-flex', alignItems: 'center' }}>
        <AccountBalanceWallet sx={{ verticalAlign: 'middle', mr: 2 }} />
        Personal Finance Visualizer
      </Typography>
    </Box>

    <Grid container spacing={4} sx={{ mb: 4 }}>
         {/* Dashboard Summary Cards */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 3, height: '450px', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PieChart sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Overview
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
        <Dashboard transactions={transactions} budgets={budgets} />
      </Box>
    </Paper>
  </Grid>
  {/* Monthly Expenses Chart */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 3, height: '450px', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <BarChart sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Monthly Expenses
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
        <MonthlyExpensesChart transactions={transactions} />
      </Box>
    </Paper>
  </Grid>

  {/* Budget vs Actual Chart */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 3, height: '450px', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Budget vs Actual
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
        <BudgetVsActualChart transactions={transactions} budgets={budgets} />
      </Box>
    </Paper>
  </Grid>

 
</Grid>
      {/* Budget Section */}
      <Grid container spacing={4} sx={{ mb: 4,mt:4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Add Budget
            </Typography>
            <BudgetForm refreshData={refreshData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Budget List
            </Typography>
            <BudgetList budgets={budgets} refreshData={refreshData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Transaction Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Add Transaction
            </Typography>
            <TransactionForm refreshData={refreshData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Transaction List
            </Typography>
            <TransactionList transactions={transactions} refreshData={refreshData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}