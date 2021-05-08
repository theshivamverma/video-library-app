import { usePlaylist } from "../playlist";
import { VideoCard } from "../Video"
import { Link } from "react-router-dom";

export default function Playlist() {
  const { playlist, playlistDispatch } = usePlaylist();

  return (
    <div>
      {playlist.map((playlistItem, index) => {
        return (
          <>
            <div>
              <div className="flex justify-sb">
                <Link to={`/playlist/${playlistItem.name}`}>
                  <h1 className="medium font-size-l">
                    {playlistItem.name}({playlistItem.videos.length})
                  </h1>
                </Link>
                <button
                  className="btn btn-icon ml-1"
                  style={{
                    display: `${index > 0 ? "initial" : "none"}`,
                  }}
                  onClick={() =>
                    playlistDispatch({
                      type: "REMOVE_PLAYLIST",
                      payload: { playlistName: playlistItem.name },
                    })
                  }
                >
                  <icon className="fas fa-trash icon-med colorAlertRed"></icon>
                </button>
              </div>
              {playlistItem.videos.map(({id, title}) => {
                return (
                  <div className="grid-container web-three mob-two mt-1">
                    <VideoCard
                      videoId={id}
                      title={title}
                      playlistCard={true}
                      playlistName={playlistItem.name}
                    />
                  </div>
                );
              })}
            </div>
            <hr className="m-2-0" />
          </>
        );
      })}
    </div>
  );
}
