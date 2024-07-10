import './styles/App.css';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/rooms')
            .then(response => response.json())
            .then(data => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching rooms:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (rooms.length === 0) return <p>No rooms found.</p>;

    return (
        <div className="dashboard-container">
            <h2 className="heading">Available Rooms</h2>
            <div className="button-container">
                <button className="create-room-button">Create Room</button>
            </div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room._id} className="table-row">
                            <td>{room._id}</td>
                            <td>{room.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button className="join-room-button">Join Room</button>
            </div>
        </div>
    );
};

export default Dashboard;
