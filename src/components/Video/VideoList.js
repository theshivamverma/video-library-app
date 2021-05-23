/* eslint-disable */

import { VideoCard, useVideo } from "../Video";
import { useEffect } from "react";
import { usePlaylist } from "../playlist";
import { useAuth } from "../auth";
import Loader from "react-loader-spinner";

export default function VideoList() {
  const { videoData } = useVideo();
  const { user, login } = useAuth();
  const { setPlaylistsData } = usePlaylist();

  useEffect(() => {
    if (user && login) {
      setPlaylistsData(user);
    }
  }, [user, login]);

  return (
    <>
      {videoData.length > 0 ? (
        <div className="grid-container web-three mob-one">
          {videoData.map((video) => (
            <VideoCard video={video} playlistCard={false} playlistName={""} />
          ))}
        </div>
      ) : (
        <div style={{ width: "100%", height: "90vh", position: "relative" }}>
          <Loader
            className="loader"
            type="TailSpin"
            color="#000"
            height={80}
            width={80}
          />
        </div>
      )}
    </>
  );
}
