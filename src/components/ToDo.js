import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToDo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos'); // Adjust the endpoint based on your backend route
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (task) => {
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h2>To Do List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.task} - {todo.completed ? "Done" : "Pending"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
