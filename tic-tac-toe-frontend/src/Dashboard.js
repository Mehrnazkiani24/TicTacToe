import React, { useState, useEffect } from 'react';
import './styles/App.css';

const Dashboard = () => {
    // Simulating room data fetching/loading
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

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
        // Generate a unique ID for the new room
        const newRoomId = Math.max(...rooms.map(room => parseInt(room._id))) + 1;
        setRooms([...rooms, { _id: newRoomId.toString(), status: 'Available' }]);
        // Optionally, navigate to the room's detail page
        console.log(`Created room with ID: ${newRoomId}`);
    };

    const joinRoom = (roomId) => {
        // Update the selected room state
        setSelectedRoom({ _id: roomId, status: 'Joined' });
        // Optionally, navigate to the room's detail page
        console.log(`Joined room with ID: ${roomId}`);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
          <div id="page_header">
            <h1>Tic-Tac-Toe</h1>
          </div>
          <div className="dashboard-container">
            <h2 className="heading">Available Rooms</h2>
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
                    <td><button onClick={() => joinRoom(room._id)}>Join</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
    );
};

export default Dashboard;
