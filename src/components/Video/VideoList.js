import {VideoCard, useVideo} from "../Video";

export default function VideoList() {
  const { videoData } = useVideo()
  console.log(videoData)
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
