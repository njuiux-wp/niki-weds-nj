import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const ToDoModal = ({ isOpen, onRequestClose, editingTodo, setTodos, todos, onUpdate }) => {
    const [title, setTitle] = useState(editingTodo ? editingTodo.title : '');
    const [description, setDescription] = useState(editingTodo ? editingTodo.description : '');
    const [dueDate, setDueDate] = useState(editingTodo ? editingTodo.dueDate : '');
    const [status, setStatus] = useState(editingTodo ? editingTodo.status : 'To Do');

    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
            setDueDate(editingTodo.dueDate);
            setStatus(editingTodo.status);
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('To Do');
        }
    }, [editingTodo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newToDo = { title, description, dueDate, status };

        try {
            let response;
            if (editingTodo) {
                response = await axios.put(`${backendUrl}/todo/${editingTodo._id}`, newToDo);
                setTodos(todos.map(todo => (todo._id === editingTodo._id ? response.data : todo))); // Update specific ToDo
            } else {
                response = await axios.post(`${backendUrl}/todo`, newToDo);
                setTodos([...todos, response.data]); // Add new ToDo to the list
            }
            onUpdate(); // Call the onUpdate function to refresh the data
            onRequestClose();
        } catch (error) {
            console.error('Error saving ToDo:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="vendorModal">
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">{editingTodo ? 'Update To Do' : 'Add To Do'}</h2>
                <button className="btn-icon" onClick={onRequestClose} type="button">
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Title</label>
                    <input
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Description</label>
                    <input
                        type="text"
                        className="form-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Due Date</label>
                    <input
                        type="date"
                        className="form-input"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Status</label>
                    <select
                        className="form-input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button className="theme-btn mt-6" type="submit">{editingTodo ? 'Update' : 'Add'}</button>
            </form>
        </Modal>
    );
};

export default ToDoModal;
