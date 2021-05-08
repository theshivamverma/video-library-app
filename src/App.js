import { useState } from "react";
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import { Playlist, PlaylistDetail } from "./components/playlist";
import Topnavbar from "./components/Topnavbar/Topnavbar";
import { VideoPage, VideoList } from "./components/Video"

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
