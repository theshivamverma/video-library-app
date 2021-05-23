import { useParams } from "react-router-dom"
import { usePlaylist } from "../playlist"
import { VideoCard, useVideo } from "../Video"

export default function PlaylistDetail(){

    const { playlistId } = useParams()

    const { playlist } = usePlaylist()
    const { videoData } = useVideo()

    console.log(playlistId)
    console.log(playlist)
    const displayPlaylist = playlist.find(playlistItem => playlistItem._id === playlistId)
console.log(displayPlaylist)
    return (
      <div>
        <h1 className="medium font-size-l">
          {displayPlaylist.name}({displayPlaylist.videos.length})
        </h1>
        <div className="grid-container web-three mob-one mt-1">
          {videoData
            .filter((video) => displayPlaylist.videos.includes(video.id))
            .map((video) => {
              return (
                <VideoCard
                  video={video}
                  playlistCard={true}
                  playlistId={displayPlaylist._id}
                />
              );
            })}
        </div>
      </div>
    );
}