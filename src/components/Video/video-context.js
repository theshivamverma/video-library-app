/* eslint-disable */

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoIds, setVideoIds] = useState([]);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    if (videoIds.length === 0) {
      getVideoIds();
    }
    if (videoIds.length > 0) {
      getDataFromYoutubeApi();
    }
  }, [videoIds]);

  async function getVideoIds() {
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/video`
      );
      if (status === 200) {
        const videoIdArray = data.videos.map((video) => {
          return video.videoId;
        });
        setVideoIds(videoIdArray);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataFromYoutubeApi() {
    try {
      const idString = videoIds.join("%2C");
      console.log(idString);
      const { status, data } = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${idString}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      if (status === 200) {
        setVideoData(data.items);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VideoContext.Provider value={{videoData}}>
      {children}
    </VideoContext.Provider>)
}

export const useVideo = () => {
  return useContext(VideoContext);
};
