import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/solid';
import ToDoModal from './ToDoModal';

const ToDoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [todos, setTodos] = useState([]); // State to manage the list of todos
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // Use environment variable for backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  // Define the fetchToDo function
  const fetchToDo = async () => {
    const response = await axios.get(`${backendUrl}/todo/${id}`);
    setTodo(response.data);
  };

  useEffect(() => {
    fetchToDo(); // Call the function to fetch the todo
  }, [id]);

  // Fetch all todos to populate the list
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${backendUrl}/todo`);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleDelete = async () => {
    await axios.delete(`${backendUrl}/todo/${id}`);
    setTodos(todos.filter(todo => todo.id !== id)); // Update the list after deletion
    navigate('/todo');
  };

  const handleEditClick = () => {
    setModalIsOpen(true);
  };

  // Function to refresh the todo data
  const refreshTodo = () => {
    fetchToDo();
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link className="btn-icon fs-14 underline" to="/todo">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <h2 className="title-font-xl ms-2">Details</h2>
        </div>
        <button onClick={handleDelete} className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-5">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Title:</span>
          <span className="font-bold">{todo.title}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Description:</span>
          <span className="font-bold">{todo.description}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Due Date:</span>
          <span className="font-bold">{todo.dueDate}</span>
        </p>
      </div>
      <h2 className="title-font-xl fs-16">Status</h2>
      <div className="flex flex-wrap items-center w-full mt-2 mb-4">
        <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">{todo.status}</div>
      </div>
      <button className="theme-btn mt-6" onClick={handleEditClick} type="button">Edit</button>
      <ToDoModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        editingTodo={todo} // Pass the current ToDo for editing
        setTodos={setTodos} // Pass the correct setTodos function
        todos={todos} // Pass the todos array
        onUpdate={refreshTodo} // Pass the refresh function here
      />
    </div>
  );
};

export default ToDoDetail;