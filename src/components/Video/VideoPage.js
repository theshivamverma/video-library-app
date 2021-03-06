/* eslint-disable */

import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useEffect, useState } from "react";
import { usePlaylist } from "../playlist";
import { useAuth } from "../auth";
import { useToast } from "../utilities/Toast"

export default function VideoPage() {
  const { videoId } = useParams();
  const { video } = useLocation().state;
  const {
    playlist,
    watchlater,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    setPlaylistsData,
    createPlaylist,
    playlistDispatch,
    addToWatchLater,
    removeFromWatchLater
  } = usePlaylist();
  const { login, token } = useAuth();
  const { callToast } = useToast()

  useEffect(() => {
    if (login && token) {
      setPlaylistsData();
    }
  }, [login, token]);

  const [modalActive, setModalActive] = useState(false);
  const [createInput, setCreateInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  async function handleCheck(e) {
    if (e.target.checked) {
      playlistDispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: { playlistId: e.target.value, videoId },
      });
      const { success } = await addVideoToPlaylist(videoId, e.target.value);
      if (success) {
        callToast("SUCCESS_TOAST", "Video added to playlist");
      } else {
        callToast("ERROR_TOAST", "Something went wrong !");
      }
    } else {
       playlistDispatch({
         type: "REMOVE_VIDEO_FROM_PLAYLIST",
         payload: { playlistId: e.target.value, videoId },
       });
       const { success } = await removeVideoFromPlaylist(videoId, e.target.value);
        if (success) {
          callToast("SUCCESS_TOAST", "Video removed from playlist");
        } else {
          callToast("ERROR_TOAST", "Something went wrong !");
        }
    }
  }

  async function handleWatchLaterClick(){
    if(login){
      if (watchlater.includes(videoId)) {
        playlistDispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: { videoId } });
        const { success } = await removeFromWatchLater(videoId);
        if(success){
          callToast("SUCCESS_TOAST", "Video removed from watch later")
        }else{
          callToast("ERROR_TOAST", "Something went wrong !")
        }
      } else {
        playlistDispatch({ type: "ADD_TO_WATCH_LATER", payload: { videoId } });
        const { success } = await addToWatchLater(videoId);
         if (success) {
           callToast("SUCCESS_TOAST", "Video added to watch later");
         } else {
           callToast("ERROR_TOAST", "Something went wrong !");
         }
      }
    }else{
      callToast( "INFO_TOAST", "You need to login first" );
    }
  }

  return (
    <div>
      <ReactPlayer
        controls={true}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={true}
        width={"100%"}
        height={"500px"}
      />
      <div className="flex justify-sb align-center p-1 flex-wrap">
        <h1 className="video-page-title medium mt-1">{video.snippet.title}</h1>
        <i
          className="fas fa-clock icon-med btn-icon"
          style={{
            color: `${
              watchlater.includes(videoId) ? "var(--alertblue)" : "initial"
            }`,
          }}
          onClick={() => handleWatchLaterClick()}
        ></i>
        <i
          className="fas fa-indent icon-med btn-icon"
          onClick={() => {
            login
              ? setModalActive(true)
              : toastDispatch({
                  type: "INFO_TOAST",
                  payload: "You need to login first",
                });
          }}
        ></i>
      </div>
      <div className={modalActive ? "modal-overlay active" : "modal-overlay"}>
        <div className="modal-container p-1 border-round center">
          <div className="flex justify-sb">
            <h1 className="center font-size-l bold">Playlists</h1>
            <button
              className="m-0-05 btn btn-icon"
              onClick={() => setModalActive(false)}
            >
              <i className="fas fa-times icon-med"></i>
            </button>
          </div>
          <div className="p-1-4">
            {playlist.map((playlistItem) => {
              return (
                <div className="flex justify-sb align-center mt-05">
                  <input
                    type="checkbox"
                    value={playlistItem._id}
                    name={playlistItem.name}
                    checked={playlistItem.videos.includes(videoId)}
                    onChange={(e) => handleCheck(e)}
                  />
                  <label>{playlistItem.name}</label>
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
            <label className="inputgroup">
              <input
                className="input-textbox focus-blue"
                placeholder=" "
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <span className="input-label">Playlist name</span>
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
                  createPlaylist(playlistName);
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
