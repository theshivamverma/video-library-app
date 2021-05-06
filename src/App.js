import { useState } from "react";
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import { Playlist } from "./components/playlist";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import Topnavbar from "./components/Topnavbar/Topnavbar";
import VideoList from "./components/VideoList";
import VideoPage from "./components/VideoPage";

function App() {
  const [leftMenu, setLeftMenu] = useState(false)
  return (
    <div className="App">
      <LeftNavbar leftMenu={leftMenu} setLeftMenu={setLeftMenu} />
      <Topnavbar setLeftMenu={setLeftMenu} />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:playlistName" element={<PlaylistDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
