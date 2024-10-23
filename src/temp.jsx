import React, { useEffect, useState } from 'react';

const TaskForm = ({ addTask, updateTask, currentTask, setCurrentTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Pending');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [assignedBy, setAssignedBy] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [actualTime, setActualTime] = useState(0);
    const [percentComplete, setPercentComplete] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title || 'Not set');
            setDescription(currentTask.description || 'Not set');
            setCategory(currentTask.category || 'Not set');
            setStatus(currentTask.status || 'Pending');
            setStartDate(currentTask.startDate ? new Date(currentTask.startDate).toISOString().split('T')[0] : '1111-11-11');
            setDueDate(currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : '1111-11-11');
            setAssignedTo(currentTask.assignedTo || 'Not set');
            setAssignedBy(currentTask.assignedBy || 'Not set');
            setDifficulty(currentTask.difficulty || 'Not set');
            setEstimatedTime(currentTask.estimatedTime || -2);
            setActualTime(currentTask.actualTime || -2);
            setPercentComplete(currentTask.percentComplete || -2);
            setFeedback(currentTask.feedback || 'Not set');
        } else {
            // Reset form with default values
            setTitle('Not set');
            setDescription('Not set');
            setCategory('Not set');
            setStatus('Pending');
            setStartDate('1111-11-11');
            setDueDate('1111-11-11');
            setAssignedTo('Not set');
            setAssignedBy('Not set');
            setDifficulty('Not set');
            setEstimatedTime(-2);
            setActualTime(-2);
            setPercentComplete(-2);
            setFeedback('Not set');
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the dates to YYYY-MM-DD before submitting
        const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '1111-11-11';
        const formattedDueDate = dueDate ? new Date(dueDate).toISOString().split('T')[0] : '1111-11-11';

        const task = {
            title: title || 'Not set',
            description: description || 'Not set',
            category: category || 'Not set',
            status,
            startDate: formattedStartDate,
            dueDate: formattedDueDate,
            assignedTo: assignedTo || 'Not set',
            assignedBy: assignedBy || 'Not set',
            difficulty: difficulty || 'Not set',
            estimatedTime: estimatedTime !== 0 ? estimatedTime : -2,
            actualTime: actualTime !== 0 ? actualTime : -2,
            percentComplete: percentComplete !== 0 ? percentComplete : -2,
            feedback: feedback || 'Not set',
        };

        if (currentTask) {
            updateTask({ ...currentTask, ...task }); // Update existing task
        } else {
            addTask(task); // Add new task
        }

        // Reset form after submission
        setTitle('Not set');
        setDescription('Not set');
        setCategory('Not set');
        setStatus('Pending');
        setStartDate('1111-11-11');
        setDueDate('1111-11-11');
        setAssignedTo('Not set');
        setAssignedBy('Not set');
        setDifficulty('Not set');
        setEstimatedTime(-2);
        setActualTime(-2);
        setPercentComplete(-2);
        setFeedback('Not set');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input
                    id="category"
                    type="text"
                    placeholder="Task Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="dueDate">Due Date:</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="assignedTo">Assigned To:</label>
                <input
                    id="assignedTo"
                    type="text"
                    placeholder="Assign To"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="assignedBy">Assigned By:</label>
                <input
                    id="assignedBy"
                    type="text"
                    placeholder="Assign By"
                    value={assignedBy}
                    onChange={(e) => setAssignedBy(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="difficulty">Difficulty:</label>
                <input
                    id="difficulty"
                    type="text"
                    placeholder="Task Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time (hrs):</label>
                <input
                    id="estimatedTime"
                    type="number"
                    placeholder="Estimated Time"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="actualTime">Actual Time (hrs):</label>
                <input
                    id="actualTime"
                    type="number"
                    placeholder="Actual Time"
                    value={actualTime}
                    onChange={(e) => setActualTime(Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="percentComplete">Percent Complete:</label>
                <input
                    type="range"
                    name="percentComplete"
                    min="0"
                    max="100"
                    step="10"
                    value={percentComplete}
                    onChange={(e) => setPercentComplete(Number(e.target.value))}
                />
                <span>{percentComplete}%</span> {/* Display current value */}
            </div>
            <div>
                <label htmlFor="feedback">Feedback:</label>
                <textarea
                    id="feedback"
                    placeholder="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>
            <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
            {currentTask && <button type="button" onClick={() => setCurrentTask(null)}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
