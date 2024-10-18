import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to login after logging out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/tasks">Tasks</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
