import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import { PlaylistProvider } from "./components/playlist"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


