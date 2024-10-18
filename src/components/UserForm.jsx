// UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, currentUser, setCurrentUser }) => {
    const [userData, setUserData] = useState({
        userId: '',
        userName: '',
        cohort: '',
        email: '',
        role: '',
        team: ''
    });

    useEffect(() => {
        if (currentUser) {
            setUserData(currentUser);
        } else {
            setUserData({
                userId: '',
                userName: '',
                cohort: '',
                email: '',
                role: '',
                team: ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {
            updateUser(userData);
        } else {
            addUser(userData);
        }
    };

    const handleCancel = () => {
        setCurrentUser(null);  // Clear the current user when canceling
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={userData.userName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="cohort"
                placeholder="Cohort"
                value={userData.cohort}
                onChange={handleChange}
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={userData.role}
                onChange={handleChange}
            />
            <input
                type="text"
                name="team"
                placeholder="Team"
                value={userData.team}
                onChange={handleChange}
            />

            <button type="submit">{currentUser ? 'Update User' : 'Add User'}</button>
            {currentUser && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
};

export default UserForm;
