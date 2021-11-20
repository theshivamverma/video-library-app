import { Link } from "react-router-dom";
import { usePlaylist } from "../playlist";
import { useToast } from "../utilities/Toast";

export default function VideoCard({
  video,
  playlistCard,
  playlistId
}) {
  const { removeVideoFromPlaylist, playlistDispatch } = usePlaylist();

  const { callToast } = useToast()

  async function handleDeleteVideo(videoId, playlistId){
     playlistDispatch({
       type: "REMOVE_VIDEO_FROM_PLAYLIST",
       payload: { playlistId , videoId },
     });

     const { success } = await removeVideoFromPlaylist(videoId, playlistId)

     if(success){
       callToast("SUCCESS_TOAST", "Video removed from playlist")
     }else{
       callToast("ERROR_TEST", "Something went wrong!")
     }
  }

  return (
    <div className="box-shadow-down video-card p-1">
      <Link to={`/video/${video.id}`} state={{ video }}>
        <img
          className="responsive-image"
          key={video.id}
          alt=""
          src={video.snippet.thumbnails.high.url}
        />
      </Link>
      <div className="flex justify-sb align-center mt-1">
        <Link to={`/video/${video.id}`} state={{ video }}>
          <h3 className="video-title medium font-size-sm">{video.snippet.title}</h3>
        </Link>
        <button
          className="btn btn-icon ml-1"
          style={{ display: `${playlistCard ? "initial" : "none"}` }}
          onClick={() =>
            handleDeleteVideo(video.id, playlistId)
          }
        >
          <icon className="fas fa-trash icon-med colorAlertRed"></icon>
        </button>
      </div>
      <div className="video-details mt-1">
        <p class="medium font-size-xsm">{video.snippet.channelTitle}</p>
        <p class="medium font-size-xsm mt-05">{video.statistics.viewCount} Views</p>
      </div>
    </div>
  );
}
