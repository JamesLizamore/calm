import React, {useState, useEffect} from 'react';

const UserForm = ({addUser, updateUser, currentUser, setCurrentUser}) => {
    const [formData, setFormData] = useState({
        userName: '',
        cohort: '',
        email: '',
        role: '',
        team: '',
        firebaseUID: ''
    });

    // Pre-fill form if editing a user
    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser);
        } else {
            setFormData({
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
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace empty strings with "Not set"
        const modifiedData = {
            ...formData,
            userName: formData.userName || 'Not set',
            cohort: formData.cohort || 'Not set',
            role: formData.role || 'Not set',
            team: formData.team || 'Not set',
            firebaseUID: formData.firebaseUID || 'Not set',
        };

        // If editing, update the user
        if (currentUser) {
            updateUser(modifiedData);
        } else {
            addUser(modifiedData);
        }
    };
    const handleCancel = () => {
        setCurrentUser(null);  // Reset the form and cancel edit
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="cohort"
                placeholder="Cohort"
                value={formData.cohort}
                onChange={handleChange}
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
            />
            <input
                type="text"
                name="team"
                placeholder="Team"
                value={formData.team}
                onChange={handleChange}
            />
            <input
                type="text"
                name="firebaseUID"
                placeholder="Firebase UID"
                value={formData.firebaseUID}
                onChange={handleChange}
            />

            {/* Submit and Cancel Buttons */}
            <button type="submit">{currentUser ? 'Update User' : 'Add User'}</button>
            {currentUser && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
};

export default UserForm;
