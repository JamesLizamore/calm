import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
    // State to store the list of tasks
    const [tasks, setTasks] = useState([]);
    // State to trigger a refresh of tasks when modified
    const [refresh, setRefresh] = useState(false);
    // State to store the task being edited
    const [currentTask, setCurrentTask] = useState(null);
    // State to control visibility of the tasks list
    const [showTasks, setShowTasks] = useState(false);

    // Fetch tasks from the API whenever the component mounts or refresh changes
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5141/task');
                setTasks(response.data); // Update tasks state with fetched data
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [refresh]); // Effect will re-run when refresh changes

    // Function to add a new task
    const addTask = async (task) => {
        try {
            await axios.post('http://localhost:5141/task', task);
            setRefresh(!refresh); // Toggle refresh to trigger re-fetch
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Function to update an existing task
    const updateTask = async (task) => {
        try {
            await axios.put(`http://localhost:5141/task/${task.id}`, task);
            setRefresh(!refresh); // Toggle refresh to update tasks list
            setCurrentTask(null); // Clear the current task after update
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Function to delete a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5141/task/${id}`);
            setRefresh(!refresh); // Toggle refresh to update tasks list
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to open print dialog and print the page
    const printToPDF = () => {
        window.print();
    };

    return (
        <div>
            <h2>Task Form</h2>
            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setShowTasks={setShowTasks} // Pass setShowTasks to TaskForm component
            />
            {/* Button to toggle task visibility */}
            <button type="button" onClick={() => setShowTasks(prev => !prev)}>
                {showTasks ? 'Hide Tasks' : 'View Tasks'}
            </button>
            {/* Button to trigger print to PDF */}
            <button type="button" onClick={printToPDF}>
                Print to PDF
            </button>
            {/* Conditionally render task list based on showTasks state */}
            {showTasks && (
                <div>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        <ul>
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    deleteTask={deleteTask}
                                    setCurrentTask={setCurrentTask}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks available.</p> // Display message if no tasks
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;
