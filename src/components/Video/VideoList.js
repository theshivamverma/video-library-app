import {VideoCard, useVideo} from "../Video";
import { useEffect } from "react";
import { usePlaylist } from "../playlist";
import { useAuth } from "../auth";

export default function VideoList() {

  const { videoData } = useVideo()
  const { user, login } = useAuth();
  const { setPlaylistsData } = usePlaylist()

   useEffect(() => {
     if (user && login) {
       setPlaylistsData(user);
     }
   }, [user, login]);

  return (
    <div className="grid-container web-three mob-two">
      {videoData.map(video => (
        <VideoCard
          video={video}
          playlistCard={false}
          playlistName={""}
        />
      ))}
    </div>
  );
}
