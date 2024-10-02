import React from 'react';

const TaskItem = ({ task, deleteTask, setCurrentTask }) => {
    // Function to format the task due date
    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'No due date'; // Return formatted date or default message
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
