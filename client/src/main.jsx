import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
