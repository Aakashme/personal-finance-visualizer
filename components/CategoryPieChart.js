import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Container, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6347', '#32CD32', '#FFD700'];

export default function CategoryPieChart({ transactions }) {
  const groupedTransactions = transactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.keys(groupedTransactions).map((key) => ({
    name: key,
    value: groupedTransactions[key],
  }));

  return (
    <Container maxWidth="sm">

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent, x, y, midAngle }) => {
              // Calculate label position
              const radius = 80; // Outer radius of the pie
              const angle = midAngle; // Angle of the slice
              const RADIAN = Math.PI / 180;
              const labelX = x + Math.cos(-angle * RADIAN) * (radius / 2); // X position
              const labelY = y + Math.sin(-angle * RADIAN) * (radius / 2); // Y position

              return (
                <text
                  x={labelX}
                  y={labelY}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={12}
                >
                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}