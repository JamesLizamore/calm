import React from 'react';

const TaskItem = ({ task, deleteTask, setCurrentTask }) => {
    const formatDate = (date) => {
        if (!date) return 'No due date';

        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(dateObj.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    };

    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {formatDate(task.dueDate)}</p>
            <button onClick={() => setCurrentTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;
