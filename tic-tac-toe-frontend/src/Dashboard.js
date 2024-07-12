import './styles/App.css';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const rooms = [
        { _id: '1', status: 'Available' },
        { _id: '2', status: 'Occupied' },
    ];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
          <div id="page_header">
            <h1>Tic-Tac-Toe</h1>
          </div>
          <div className="dashboard-container">
            <h2 className="heading">Available Rooms</h2>
            <div className="button-container">
              <button className="join-room-button">Join Room</button>
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
          </div>
        </>
    );
};

export default Dashboard;
