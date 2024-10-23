import React from 'react';

const UserItem = ({ user, deleteTask, onEdit }) => {
    
    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the user: "${user.userName}"?`);
        if (confirmDelete) {
            deleteTask(user.userId);
        }
    }
    
    const handleEdit = () => {
        const confirmEdit = window.confirm('Are you sure you want to edit the user: "${user.userName}"?');
        if (confirmEdit) {
            onEdit();
        }
    }
    
    return (
        <li>
            <div>
                <h3>{user.userName}</h3>
                <p>Email: {user.email}</p>
                <p>Cohort: {user.cohort}</p>
                <p>Role: {user.role}</p>
                <p>Team: {user.team}</p>
            </div>

            {/* Buttons for editing and deleting */}
            <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
};

export default UserItem;
