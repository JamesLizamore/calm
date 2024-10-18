import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserList from './components/UserList.jsx'; // Placeholder for users component
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <div>
                {user ? (
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/tasks" element={<TaskList />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="*" element={<TaskList />} /> {/* Default route */}
                        </Routes>
                    </>
                ) : (
                    <Login />
                )}
            </div>
        </Router>
    );
};

export default App;
