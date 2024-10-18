import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem.jsx';
import TaskForm from './TaskForm.jsx';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [showTasks, setShowTasks] = useState(false);

    // State for filtering tasks
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [assignedToFilter, setAssignedToFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');

    // State for sorting
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // Sorting direction (asc or desc)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5141/task');
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [refresh]);

    const addTask = async (task) => {
        if (tasks.some(existingTask => existingTask.title === task.title)) {
            alert('Task title already exists!');
            return;
        }

        try {
            await axios.post('http://localhost:5141/task', task);
            alert('Task added successfully!');
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (task) => {
        if (tasks.some(existingTask => existingTask.title === task.title && existingTask.id !== task.id)) {
            alert('Task title already exists!');
            return;
        }

        try {
            await axios.put(`http://localhost:5141/task/${task.id}`, task);
            alert('Task updated successfully!');
            setRefresh(!refresh);
            setCurrentTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5141/task/${id}`);
            alert('Task deleted successfully!');
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const printToPDF = () => {
        window.print();
    };

    // Filtered tasks based on selected filters
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        const matchesCategory = categoryFilter ? task.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
        const matchesAssignedTo = assignedToFilter ? task.assignedTo.toLowerCase().includes(assignedToFilter.toLowerCase()) : true;
        const matchesTitle = titleFilter ? task.title.toLowerCase().includes(titleFilter.toLowerCase()) : true;

        return matchesStatus && matchesCategory && matchesAssignedTo && matchesTitle;
    });

    // Sort the filtered tasks based on selected field
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortField) {
            const fieldA = a[sortField] ? a[sortField].toString().toLowerCase() : '';
            const fieldB = b[sortField] ? b[sortField].toString().toLowerCase() : '';
            if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0; // No sorting
    });

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Toggle direction
        } else {
            setSortField(field);
            setSortDirection('asc'); // Default to ascending
        }
    };

    const handleClearSort = () => {
        setSortField('');
        setSortDirection('asc');
    };

    return (
        <div>
            <h2>Task Form</h2>
            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
            {/* Filter inputs */}
            <div>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    type="text"
                    placeholder="Filter by Category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Assigned To"
                    value={assignedToFilter}
                    onChange={(e) => setAssignedToFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Title"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                />
            </div>
            {/* Button to toggle task visibility */}
            <button type="button" onClick={() => setShowTasks(prev => !prev)}>
                {showTasks ? 'Hide Tasks' : 'View Tasks'}
            </button>
            {/* Button to trigger print to PDF */}
            <button type="button" onClick={printToPDF}>
                Print to PDF
            </button>
            {/* Sort buttons */}
            <div>
                <button onClick={() => handleSortChange('title')}>
                    Sort by Title {sortField === 'title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => handleSortChange('category')}>
                    Sort by Category {sortField === 'category' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => handleSortChange('assignedTo')}>
                    Sort by Assigned To {sortField === 'assignedTo' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => handleSortChange('status')}>
                    Sort by Status {sortField === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={handleClearSort}>Clear Sort</button>
            </div>
            {/* Conditionally render task list based on showTasks state */}
            {showTasks && (
                <div>
                    {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
                        <ul>
                            {sortedTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    deleteTask={deleteTask}
                                    setCurrentTask={setCurrentTask}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;
