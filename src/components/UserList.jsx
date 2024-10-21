import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UserItem from './UserItem.jsx';
import UserForm from './UserForm.jsx';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [cohortFilter, setCohortFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [editingUser, setEditingUser] = useState(null);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5141/user');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Filter and sort users
    useEffect(() => {
        let filtered = [...users];

        if (cohortFilter) {
            filtered = filtered.filter(user => user.cohort.toLowerCase() === cohortFilter.toLowerCase());
        }

        if (roleFilter) {
            filtered = filtered.filter(user => user.role.toLowerCase() === roleFilter.toLowerCase());
        }
        
        if (sortField) {
            filtered.sort((a, b) => {
                const fieldA = a[sortField].toString().toLowerCase();
                const fieldB = b[sortField].toString().toLowerCase();
                if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredUsers(filtered);
    }, [cohortFilter, roleFilter, sortField, sortDirection, users]);

    // Function to handle sorting
    const handleSortChange = (field) => {
        setSortField(field);
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    };

    // Add a new user (POST)
    const handleAddUser = async (newUser) => {
        try {
            const response = await axios.post('http://localhost:5141/user', newUser);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Edit an existing user (PUT)
    const handleEditUser = async (updatedUser) => {
        try {
            const response = await axios.put(`http://localhost:5141/user/${updatedUser.userId}`, updatedUser);
            setUsers(users.map(user => (user.userId === updatedUser.userId ? response.data : user)));
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete a user (DELETE)
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5141/user/${userId}`);
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Set user for editing
    const handleEditButtonClick = (user) => {
        setEditingUser(user);
    };

    return (
        <div>
            <h2>Users</h2>

            {/* Filters */}
            <div>
                <label>
                    Filter by Cohort:
                    <input type="text" value={cohortFilter} onChange={(e) => setCohortFilter(e.target.value)}
                           placeholder="Enter Cohort"/>
                </label>
                <label>
                    Filter by Role:
                    <input type="text" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
                           placeholder="Enter Role"/>
                </label>
                
                <button onClick={() => {
                    setCohortFilter('');
                    setRoleFilter('');
                }}>Clear Filters
                </button>
            </div>

            {/* Sorting */}
            <div>
                <button onClick={() => handleSortChange('userName')}>Sort by
                    Name {sortField === 'userName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</button>
                <button onClick={() => handleSortChange('cohort')}>Sort by
                    Cohort {sortField === 'cohort' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</button>
                <button onClick={() => handleSortChange('role')}>Sort by
                    Role {sortField === 'role' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</button>
                <button onClick={() => {
                    setSortField('');
                    setSortDirection('asc');
                }}>Clear Sort
                </button>
            </div>

            {/* User List */}
            {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map(user => (
                        <UserItem
                            key={user.userId}
                            user={user}
                            onEdit={() => handleEditButtonClick(user)}
                            onDelete={() => handleDeleteUser(user.userId)}
                        />
                    ))}
                </ul>
            ) : (
                <p>No users available.</p>
            )}

            {/* User Form for Adding/Editing */}
            <UserForm
                addUser={handleAddUser}
                updateUser={handleEditUser}
                currentUser={editingUser}
                setCurrentUser={setEditingUser}
            />
        </div>
    );
};

export default UserList;
