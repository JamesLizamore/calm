import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, currentUser, setCurrentUser }) => {
    const [userData, setUserData] = useState({
        userId: '',
        userName: '',
        cohort: '',
        email: '',
        role: '',
        team: '',
        firebaseUID: ''
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
                team: '',
                firebaseUID: ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure email is present
        if (!userData.email) {
            alert("Email is required");
            return;
        }

        // Set non-required fields to "not set" if they are empty
        const updatedUserData = {
            ...userData,
            userName: userData.userName || "not set",
            cohort: userData.cohort || "not set",
            role: userData.role || "not set",
            team: userData.team || "not set",
            firebaseUID: userData.firebaseUID || "not set"
        };

        if (currentUser) {
            updateUser(updatedUserData);
        } else {
            addUser(updatedUserData);
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
            <input
                type="text"
                name="firebaseUID"
                placeholder="Firebase UID"
                value={userData.firebaseUID}
                onChange={handleChange}
            />

            <button type="submit">{currentUser ? 'Update User' : 'Add User'}</button>
            {currentUser && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
};

export default UserForm;
