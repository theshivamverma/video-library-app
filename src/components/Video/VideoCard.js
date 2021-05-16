import { Link } from "react-router-dom";
import { usePlaylist } from "../playlist";

export default function VideoCard({
  video,
  playlistCard,
  playlistId
}) {
  const { removeVideoFromPlaylist } = usePlaylist();

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
            removeVideoFromPlaylist(video.id, playlistId)
          }
        >
          <icon className="fas fa-trash icon-med colorAlertRed"></icon>
        </button>
      </div>
      <div className="video-details mt-1">
        <p class="medium font-size-xsm">{video.snippet.channelTitle}</p>
        <p class="medium font-size-xsm">{video.statistics.viewCount}</p>
      </div>
    </div>
  );
}
