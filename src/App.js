import { useState } from "react";
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import {Login, Register} from "./components/login/";
import { Playlist, PlaylistDetail, Watchlater } from "./components/playlist";
import { Toast } from "./components/utilities/Toast";
import Topnavbar from "./components/utilities/Topnavbar/Topnavbar";
import { VideoPage, VideoList } from "./components/Video"

function App() {
  const [leftMenu, setLeftMenu] = useState(false)
  return (
    <>
      <Topnavbar setLeftMenu={setLeftMenu} />
      <div className="App">
        <LeftNavbar leftMenu={leftMenu} setLeftMenu={setLeftMenu} />

        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/watchlater" element={<Watchlater />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
        </Routes>
        <Toast />
      </div>
    </>
  );
}

export default App;
