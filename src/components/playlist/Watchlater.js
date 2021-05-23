/* eslint-disable */

import { useEffect } from "react";
import { usePlaylist } from "../playlist";
import { useAuth } from "../auth";
import { VideoCard, useVideo } from "../Video";

export default function Watchlater() {
  const { videoData } = useVideo();
  const { watchlater, setPlaylistsData } = usePlaylist();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user && login) {
      setPlaylistsData(user);
    }
  }, [login, user]);

  return (
    <div>
      <h1 className="medium font-size-l">Watchlater ({watchlater.length})</h1>
      <div className="grid-container web-three mob-one mt-1">
        {videoData
          .filter((video) => watchlater.includes(video.id))
          .map((video) => {
            return (
              <VideoCard video={video} playlistCard={false} playlistId={""} />
            );
          })}
      </div>
    </div>
  );
}
