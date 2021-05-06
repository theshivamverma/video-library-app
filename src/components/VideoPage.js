/* eslint-disable */

import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useEffect, useState } from "react";
import { usePlaylist } from "../components/playlist";

export default function VideoPage() {
  const { videoId } = useParams();
  const { title } = useLocation().state;
  const { playlist, playlistDispatch } = usePlaylist();
  const [modalActive, setModalActive] = useState(false);
  const [createInput, setCreateInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistsContainingVideo, setPlaylistsContainingVideo] = useState([]);

  function handleCheck(e) {
    if (e.target.checked) {
      playlistDispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: {
          playlistName: e.target.value,
          video: { id: videoId, title },
        },
      });
    } else {
      setPlaylistsContainingVideo((currentPlaylist) =>
        currentPlaylist.filter(
          (currentPlaylistItem) => currentPlaylistItem !== e.target.value
        )
      );
      playlistDispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: { playlistName: e.target.value, id: videoId },
      });
    }
  }

  function checkForPlaylist() {
    playlist.map((playlistItem) => {
      playlistItem.videos.map((video) => {
        if (video.id === videoId) {
          setPlaylistsContainingVideo((currentPlaylist) => [
            ...currentPlaylist,
            playlistItem.name,
          ]);
        }
      });
    });
  }

  useEffect(() => {
    checkForPlaylist();
  }, [playlist]);

  return (
    <div>
      <ReactPlayer
        controls={true}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={true}
        width={"100%"}
        height={"600px"}
      />
      <div className="flex justify-sb align-center p-1">
        <h1 className="video-title medium mt-1">{title}</h1>
        <i
          className="fas fa-indent icon-med btn-icon"
          onClick={() => setModalActive(true)}
        ></i>
      </div>
      <div className={modalActive ? "modal-overlay active" : "modal-overlay"}>
        <div className="modal-container p-1 border-round center">
          <div className="flex justify-sb">
            <h1 className="center font-size-l bold">My playlists</h1>
            <button
              className="m-0-05 btn btn-icon"
              onClick={() => setModalActive(false)}
            >
              <i className="fas fa-times icon-med"></i>
            </button>
          </div>
          <div className="p-1-4">
            {playlist.map((playlist) => {
              return (
                <div className="flex justify-sb align-center mt-05">
                  <input
                    type="checkbox"
                    value={playlist.name}
                    name={playlist.name}
                    checked={playlistsContainingVideo.includes(playlist.name)}
                    onChange={(e) => handleCheck(e)}
                  />
                  <label>{playlist.name}</label>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-outline border-round"
            onClick={() => setCreateInput(true)}
            style={{ display: `${createInput ? "none" : "initial"}` }}
          >
            Create new playlist
          </button>
          <div
            className="flex"
            style={{ display: `${createInput ? "block" : "none"}` }}
          >
            <label class="inputgroup">
              <input
                class="input-textbox focus-blue"
                placeholder=" "
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <span class="input-label">Playlist name</span>
            </label>
            <div className="flex justify-sb">
              <button
                className="btn btn-outline border-round"
                onClick={() => setCreateInput(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-col btn-outline btn-primary border-round"
                onClick={() => {
                  setPlaylistName("");
                  playlistDispatch({
                    type: "CREATE_NEW_PLAYLIST",
                    payload: playlistName,
                  });
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
