import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../src/styles/App.css'; // Ensure your CSS file is correctly linked
import JoinRoom from './components/JoinRoom';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    let nextRoomId = 1000; // Initialize the room ID counter

    useEffect(() => {
        // Simulate a delay in fetching rooms
        setTimeout(() => {
            setIsLoading(false);
            // Example rooms data
            setRooms([
                { _id: '1', status: 'Available' },
                { _id: '2', status: 'Occupied' },
            ]);
        }, 2000);
    }, []);

    const createRoom = () => {
        const newRoomId = nextRoomId++; // Use the incremented counter as the new room ID
        setRooms([...rooms, { _id: newRoomId.toString(), status: 'Available' }]);
        console.log(`Created room with ID: ${newRoomId}`);
    };

    const handleNewRoomId = (newId) => {
        if (!isNaN(newId) && newId.length === 4) {
            const updatedRooms = rooms.map(room =>
                room._id === selectedRoomId ? { ...room, _id: newId } : room
            );
            setRooms(updatedRooms);
            setIsEditing(false); // Exit edit mode
        } else {
            alert('Invalid room ID. Please enter a 4-digit number.');
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const selectRoomForEditing = (roomId) => {
        setSelectedRoomId(roomId);
        setIsEditing(true);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Router>
            <div id="page_header">
                <h1>Tic-Tac-Toe Dashboard</h1>
            </div>
            <div className="dashboard-container">
                <h2 className="heading">Manage Rooms</h2>
                <div className="button-container">
                    <button onClick={createRoom} className="create-room-button">Create Room</button>
                </div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room._id} className="table-row">
                                <td>{room._id}</td>
                                <td>{room.status}</td>
                                <td>
                                    <Link to={`/join-room/${room._id}`}>Join</Link>
                                    <button onClick={() => setRooms(rooms.filter(r => r._id !== room._id))}>Delete</button>
                                    {isEditing && (
                                        <input
                                            type="text"
                                            placeholder="Enter new room ID"
                                            value={room._id}
                                            onChange={(e) => handleNewRoomId(e.target.value)}
                                            onBlur={() => toggleEditMode()}
                                        />
                                    )}
                                    {!isEditing && (
                                        <button onClick={() => selectRoomForEditing(room._id)}>Edit Room ID</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Routes>
                <Route path="/join-room/:roomId" element={<JoinRoom />} />
            </Routes>
        </Router>
    );
};

export default Dashboard;
