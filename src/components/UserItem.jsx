// UserItem.jsx
import React from 'react';

const UserItem = ({ user, onDelete, onEdit }) => {
    return (
        <li>
            <h3>{user.userName}</h3>
            <p>Email: {user.email}</p>
            <p>Cohort: {user.cohort}</p>
            <p>Role: {user.role}</p>
            <p>Team: {user.team}</p>

            {/* Edit button */}
            <button onClick={onEdit}>Edit</button>

            {/* Delete button */}
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default UserItem;
