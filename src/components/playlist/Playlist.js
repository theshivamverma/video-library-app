/* eslint-disable */

import { useEffect } from "react";
import { usePlaylist } from "../playlist";
import { VideoCard, useVideo } from "../Video";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";

export default function Playlist() {
  const { videoData } = useVideo();
  const { login, token } = useAuth();
  const { playlist, playlistDispatch, setPlaylistsData, deletePlaylist } =
    usePlaylist();

  useEffect(() => {
    if (login && token) {
      setPlaylistsData();
    }
  }, [token, login]);

  return (
    <div>
      {playlist.map((playlistItem, index) => {
        console.log({ playlistItem });
        return (
          <>
            <div>
              <div className="flex justify-sb">
                <Link to={`/playlist/${playlistItem._id}`}>
                  <h1 className="medium font-size-l">
                    {playlistItem.name}({playlistItem.videos.length})
                  </h1>
                </Link>
                <button
                  className="btn btn-icon ml-1"
                  style={{
                    display: `${index > 0 ? "initial" : "none"}`,
                  }}
                  onClick={() => {
                    deletePlaylist(playlistItem._id);
                    playlistDispatch({
                      type: "REMOVE_PLAYLIST",
                      payload: { playlistId: playlistItem._id },
                    });
                  }}
                >
                  <icon className="fas fa-trash icon-med colorAlertRed"></icon>
                </button>
              </div>
              <div className="grid-container web-three mob-one mt-1">
                {videoData
                  .filter((video) => playlistItem.videos.includes(video.id))
                  .map((video) => {
                    return (
                      <VideoCard
                        video={video}
                        playlistCard={true}
                        playlistId={playlistItem._id}
                      />
                    );
                  })}
              </div>
            </div>
            <hr className="m-2-0" />
          </>
        );
      })}
    </div>
  );
}
