// src/components/TaskForm.jsx
import React, { useEffect, useState } from 'react';

const TaskForm = ({ addTask, updateTask, currentTask, setCurrentTask, setShowTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setStatus(currentTask.status);
            setDueDate(new Date(currentTask.dueDate));
        } else {
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setDueDate('');
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status, dueDate };
        if (currentTask) {
            updateTask({ ...currentTask, ...task }); // Update existing task
        } else {
            addTask(task); // Add new task
        }
        // Reset form after submission
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button id="btn-add" type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
            {currentTask && <button type="button" onClick={() => setCurrentTask(null)}>Cancel</button>}

        </form>
    );
};

export default TaskForm;
