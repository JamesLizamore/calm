import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, setCurrentTask }) => {
    const [showMore, setShowMore] = useState(false); // State to control the "See More" toggle

    // Function to format the task dates
    const formatDate = (date) => {
        if (!date) return 'No date';
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // Handle task deletion with confirmation
    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the task "${task.title}"?`);
        if (confirmDelete) {
            deleteTask(task.id); // Proceed with task deletion if confirmed
        }
    };
    
    const handleEdit = () => {
        const confirmEdit = window.confirm(`Are you sure you want to edit the task "${task.title}"?`);
        if (confirmEdit) {
            setCurrentTask(task);
        }
    }

    return (
        <li>
            {/* Display essential fields */}
            <h3>{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Status: {task.status}</p>
            <p>Assigned To: {task.assignedTo}</p>

            {/* Toggle "See More" button */}
            <button onClick={() => setShowMore(!showMore)}>
                {showMore ? 'See Less' : 'See More'}
            </button>

            {/* Conditionally display additional fields */}
            {showMore && (
                <div>
                    <p>Description: {task.description}</p>
                    <p>Start Date: {formatDate(task.startDate)}</p>
                    <p>Due Date: {formatDate(task.dueDate)}</p>
                    <p>Assigned By: {task.assignedBy}</p>
                    <p>Difficulty: {task.difficulty}</p>
                    <p>Estimated Time (hrs): {task.estimatedTime}</p>
                    <p>Actual Time (hrs): {task.actualTime}</p>
                    <p>Percent Complete: {task.percentComplete}%</p>
                    <p>Feedback: {task.feedback}</p>
                </div>
            )}

            {/* Buttons for editing or deleting */}
            <button onClick={() => handleEdit()}>Edit</button>
            {/* Confirmation before deletion */}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TaskItem;
