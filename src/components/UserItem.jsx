import React from 'react';

const UserItem = ({ user, onDelete, onEdit }) => {
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
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </li>
    );
};

export default UserItem;
