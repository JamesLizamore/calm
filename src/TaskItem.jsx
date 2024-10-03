import React from 'react';

const TaskItem = ({ task, deleteTask, setCurrentTask }) => {
    // Function to format the task due date
    const formatDate = (date) => {
        if (!date) return 'No due date';

        // format date in RSA date format
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(dateObj.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    };
    return (
        <li>
            {/* Display task title */}
            <h3>{task.title}</h3>
            {/* Display task description */}
            <p>{task.description}</p>
            {/* Display task status */}
            <p>Status: {task.status}</p>
            {/* Display formatted due date */}
            <p>Due Date: {formatDate(task.duedate)}</p>
            {/* Button to set the current task for editing */}
            <button onClick={() => setCurrentTask(task)}>Edit</button>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;