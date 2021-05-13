import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { PlaylistProvider } from "./components/playlist";
import { VideoProvider } from "./components/Video";
import { AuthProvider } from "./components/auth"
import { ToastProvider } from "./components/utilities/Toast"

ReactDOM.render(
  <React.StrictMode>
    <VideoProvider>
      <PlaylistProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <App />
            </Router>
          </ToastProvider>
        </AuthProvider>
      </PlaylistProvider>
    </VideoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
