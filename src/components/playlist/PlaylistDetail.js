import { useParams } from "react-router-dom"
import { usePlaylist } from "../playlist"
import VideoCard from "../VideoCard";

export default function PlaylistDetail(){

    const { playlistName } = useParams()

    const { playlist } = usePlaylist()

    const displayPlaylist = playlist.find(displayPlaylist => displayPlaylist.name === playlistName)

    return (
      <div>
        <h1 className="medium font-size-l">
          {displayPlaylist.name}({displayPlaylist.videos.length})
        </h1>
        {displayPlaylist.videos.map((video) => {
          return (
            <div className="grid-container web-three mob-two mt-1">
              <VideoCard
                videoId={video.id}
                title={video.title}
                playlistCard={true}
                playlistName={displayPlaylist.name}
              />
            </div>
          );
        })}
      </div>
    );
}