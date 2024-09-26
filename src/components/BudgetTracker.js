import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('/api/budget'); // Adjust the endpoint based on your backend route
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    fetchBudget();
  }, []);

  return (
    <div>
      <h2>Budget Tracker</h2>
      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>{exp.name}: ${exp.cost}</li>
        ))}
      </ul>
      <h3>Total: ${expenses.reduce((acc, curr) => acc + curr.cost, 0)}</h3>
    </div>
  );
};

export default BudgetTracker;
