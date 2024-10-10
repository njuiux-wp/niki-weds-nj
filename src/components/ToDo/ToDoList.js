import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/solid';
import ToDoModal from './ToDoModal';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(`${backendUrl}/todo`);
        setTodos(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${backendUrl}/todo/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    // Edit function
    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setModalIsOpen(true);
    };

    // This function will be passed to ToDoModal to refresh the todo list
    const refreshTodos = () => {
        fetchTodos();
        setModalIsOpen(false); // Optionally close the modal after update
        setEditingTodo(null); // Reset editingTodo
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="title-font-xl">To Do</h2>
                <button onClick={() => setModalIsOpen(true)} className="btn-icon fs-14 underline" type="button">Add</button>
            </div>
            {todos.map(todo => (
                <div key={todo._id} className="app-card flex justify-between mb-4">
                    <div className="flex flex-col">
                        <p className="title-font-m">{todo.title}</p>
                        <p className="desc-font-s my-1">Due Date: {todo.dueDate}</p>
                    </div>
                    <div className="flex">
                        <button className="btn-icon" onClick={() => handleEdit(todo)} type="button">
                            <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="btn-icon !mx-4" onClick={() => handleDelete(todo._id)} type="button">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                        <Link to={`/todo/${todo._id}`} className="btn-icon">
                            <ChevronRightIcon className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            ))}
            <ToDoModal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setEditingTodo(null);
                }}
                editingTodo={editingTodo}
                setTodos={setTodos} // Pass setTodos if necessary
                todos={todos} // Pass todos if necessary
                onUpdate={refreshTodos} // Pass the refresh function
            />
        </div>
    );
};

export default ToDoList;