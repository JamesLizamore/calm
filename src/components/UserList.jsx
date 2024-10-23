import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem.jsx';
import UserForm from './UserForm.jsx';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5141/user');
                setUsers(response.data);
                setFilteredUsers(response.data);  // Initialize with all users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [refresh]);

    // Add a new user
    const addUser = async (user) => {
        try {
            await axios.post('http://localhost:5141/user', user);
            alert('User added successfully!');
            //setUsers([...users, response.data]);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Edit an existing user
    const updateUser = async (user) => {
        try {
            await axios.put(`http://localhost:5141/user/${user.userId}`, user);
            alert('User updated successfully!');
            setRefresh(!refresh);
            setEditingUser(null);  // Reset edit mode
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5141/user/${userId}`);
            alert('User deleted successfully!')
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User Management</h2>

            {/* List of users */}
            <ul>
                {filteredUsers.map(user => (
                    <UserItem
                        key={user.userId}
                        user={user}
                        deleteTask={() => deleteUser(user.userId)}
                        onEdit={() => setEditingUser(user)}
                    />
                ))}
            </ul>

            {/* Form for adding/editing users */}
            <UserForm
                addUser={addUser}
                updateUser={updateUser}
                currentUser={editingUser}
                setCurrentUser={setEditingUser}
            />
        </div>
    );
};

export default UserList;
