import { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { connectSocket } from './socket';

// Uncomment import statement below after building queries and mutations
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function App() {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <div className="flex-column justify-center align-center min-100-vh bg-primary">
      <Outlet />
    </div>
  );
}

export default App;
