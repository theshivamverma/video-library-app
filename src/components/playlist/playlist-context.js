/* eslint-disable */

import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { playlistReducer } from "../playlist";
const PlaylistContext = createContext();

const initialState = {
  playlist: [],
  watchlater: [],
};

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  useEffect(() => {}, []);

  async function createPlaylist(name) {
    try {
      const { status: playlistStatus, data: playListData } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/playlist`,
        {
          name,
        }
      );
      if (playlistStatus === 200) {
        console.log(playListData.savedPlaylist);
          const { status } = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user/add-new-playlist`,
            {
              playlistId: playListData.savedPlaylist._id,
            }
          );
        
        if (status === 200) {
          dispatch({
            type: "CREATE_NEW_PLAYLIST",
            payload: {
              name: playListData.savedPlaylist.name,
              _id: playListData.savedPlaylist._id,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setPlaylistsData(){
    try {
      const { status, data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/userdetail`)
      console.log({data})
      if(status === 200){
        const loadData = data.user.playlists.map((playlist) => {
          return {
            name: playlist.name,
            videos: playlist.videos,
            _id: playlist._id,
          };
        });
        dispatch({ type: "LOAD_PLAYLIST_DATA", payload: loadData });
        dispatch({ type: "LOAD_WATCH_LATER_DATA", payload: data.user.watchlater })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function addVideoToPlaylist(videoId, playlistId){
    try {
        const { status, data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/playlist/${playlistId}/add-video`, {
            videoId
        })
        if(status === 200){
            console.log(data)
            // dispatch({ type: "ADD_VIDEO_TO_PLAYLIST", payload: { playlistId, videoId } })
        }
    } catch (error) {
        
    }
  }

  async function removeVideoFromPlaylist(videoId, playlistId){
       try {
         const { status, data } = await axios.post(
           `${process.env.REACT_APP_API_BASE_URL}/playlist/${playlistId}/remove-video`,
           {
             videoId,
           }
         );
         if (status === 200) {
             console.log(data)
           dispatch({
             type: "REMOVE_VIDEO_FROM_PLAYLIST",
             payload: { playlistId, videoId },
           });
         }
       } catch (error) {
         console.log(error)
       }
  }

  async function deletePlaylist(playlistId){
    try {
      const { status, data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/playlist/${playlistId}/delete`)
      if(status === 200){
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function addToWatchLater(videoId){
    try {
      const { status, data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/add-to-watch-later`, {
        videoId
      })
      if(status === 200){
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function removeFromWatchLater(videoId){
    try {
      const { status, data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/remove-from-watch-later`, {
        videoId
      })
      if(status === 200){
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlist: state.playlist,
        watchlater: state.watchlater,
        playlistDispatch: dispatch,
        createPlaylist,
        setPlaylistsData,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        deletePlaylist,
        addToWatchLater,
        removeFromWatchLater
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}
