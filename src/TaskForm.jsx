// src/components/TaskForm.jsx
import React, { useEffect, useState } from 'react';

const TaskForm = ({ addTask, updateTask, currentTask, setCurrentTask, setShowTasks }) => {
    // State to manage form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

    // Effect to populate form fields when editing a task
    useEffect(() => {
        if (currentTask) {
            // If a current task is set, populate fields with its data
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setStatus(currentTask.status);
            setDueDate(new Date(currentTask.dueDate));
        } else {
            // Clear form fields if no task is selected
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setDueDate('');
        }
    }, [currentTask]); // Run effect when currentTask changes

    // Handle form submission for adding or updating a task
    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status, dueDate };
        if (currentTask) {
            // Update the existing task
            updateTask({ ...currentTask, ...task });
        } else {
            // Add a new task
            addTask(task);
        }
        // Reset form fields after submission
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input for task title */}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {/* Textarea for task description */}
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            {/* Select dropdown for task status */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {/* Input for task due date */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            {/* Submit button, with text based on whether editing or adding a task */}
            <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
            {/* Cancel button to reset the form if editing a task */}
            {currentTask && <button type="button" onClick={() => setCurrentTask(null)}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
