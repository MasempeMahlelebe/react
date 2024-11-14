import React, { useState, useEffect } from 'react';
import './UsersManagement.css';

const UsersManagement = () => {
    const [updateUser, setUpdateUser] = useState({ oldUsername: '', newUsername: '', newPassword: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Update an existing user
    const updateExistingUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5300/updateUser', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateUser),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setUpdateUser({ oldUsername: '', newUsername: '', newPassword: '' });
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="usersManagement">
            <h2>Users Management</h2>
            {message && <div className="message">{message}</div>}

            {/* Container for Update User Form */}
            <div className="form-container">
                {/* Update User Form */}
                <form id="updateUserForm" onSubmit={updateExistingUser}>
                    <div className="form-group">
                        <label>Current Username:</label>
                        <input
                            type="text"
                            value={updateUser.oldUsername}
                            onChange={(e) => setUpdateUser({ ...updateUser, oldUsername: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>New Username:</label>
                        <input
                            type="text"
                            value={updateUser.newUsername}
                            onChange={(e) => setUpdateUser({ ...updateUser, newUsername: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={updateUser.newPassword}
                            onChange={(e) => setUpdateUser({ ...updateUser, newPassword: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>Update User</button>
                </form>
            </div>
        </section>
    );
};

export default UsersManagement;
