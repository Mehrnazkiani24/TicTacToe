import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import apolloClient from './apolloClient';


const GET_GAMES = gql`
  query GetGames {
    games {
      id
      players {
        id
        username
      }
      status
    }
  }
`;


const CREATE_GAME = gql`
  mutation CreateGame($playerId: ID!) {
    createGame(playerId: $playerId) {
      id
      players {
        id
        username
      }
      status
    }
  }
`;

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);

    // Fetch games from GraphQL server
    const { loading: gamesLoading, error: gamesError, data: gamesData } = useQuery(GET_GAMES);

    // Handle creating a new game
    const [createGame] = useMutation(CREATE_GAME);

    useEffect(() => {
        // Simulate a delay in fetching games
        setTimeout(() => {
            setIsLoading(false);
            // Assuming gamesData is returned with the expected structure
            setGames(gamesData?.games || []);
        }, 2000);
    }, [gamesData]);

    const handleCreateGame = () => {
        createGame({
            variables: { playerId: 'someUserId' }, // Replace 'someUserId' with actual user ID
        }).then((result) => {
            console.log(result.data.createGame);
        });
    };

    if (isLoading || gamesLoading) return <p>Loading...</p>;

    return (
        <Router>
            <div id="page_header">
                <h1>Tic-Tac-Toe Dashboard</h1>
            </div>
            <div className="dashboard-container">
                <h2 className="heading">Manage Games</h2>
                <div className="button-container">
                    <button onClick={handleCreateGame} className="create-game-button">Create New Game</button>
                </div>
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            <Link to={`/join-room/${game.id}`}>Join Room {game.id}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Routes>
                <Route path="/join-room/:roomId" element={<GameRoom />} /> {/* Ensure GameRoom component is imported */}
            </Routes>
        </Router>
    );
};

export default Dashboard;
