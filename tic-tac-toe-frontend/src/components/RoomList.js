import React from 'react';
import '../styles/RoomList.css'; 

const RoomList = ({ rooms }) => {
    return (
        <div className="room-list-container">
            <h2 className="heading">Available Rooms</h2>
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
    );
};

export default RoomList;
