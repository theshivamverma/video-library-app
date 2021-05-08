import { Link } from "react-router-dom";
import { usePlaylist } from "../playlist";

export default function VideoCard({
  videoId,
  title,
  playlistCard,
  playlistName,
}) {
  const { playlistDispatch } = usePlaylist();

  return (
    <div className="box-shadow-down video-card p-1">
      <Link to={`/video/${videoId}`} state={{ title }}>
        <img
          className="responsive-image"
          key={videoId}
          alt=""
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        />
      </Link>
      <div className="flex justify-sb align-center mt-1">
        <Link to={`/video/${videoId}`} state={{ title }}>
          <h3 className="video-title medium font-size-sm">{title}</h3>
        </Link>
        <button
          className="btn btn-icon ml-1"
          style={{ display: `${playlistCard ? "initial" : "none"}` }}
          onClick={() =>
            playlistDispatch({
              type: "REMOVE_VIDEO_FROM_PLAYLIST",
              payload: { playlistName, id: videoId },
            })
          }
        >
          <icon className="fas fa-trash icon-med colorAlertRed"></icon>
        </button>
      </div>
    </div>
  );
}
