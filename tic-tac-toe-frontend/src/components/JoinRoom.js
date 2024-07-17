import React from 'react';
import '../styles/BlankPage.css';

const JoinRoom = ({ match }) => {
  const roomId = match.params.roomId;
  return (
    <div className="join-room">
      <h2>Join room {roomId}</h2>
      <p>Garfield Cat!.</p>


    </div>
  );
};

export default JoinRoom;
