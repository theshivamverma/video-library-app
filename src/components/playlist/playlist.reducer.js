export default function playlistReducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        playlist: action.payload.playlistData,
        watchlater: action.payload.watchlaterData,
      };
    case "CREATE_NEW_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.concat({
          name: action.payload.name,
          _id: action.payload._id,
          videos: [],
        }),
      };
    case "ADD_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem._id === action.payload.playlistId) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.concat(action.payload.videoId),
            };
          } else return playlistItem;
        }),
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem._id === action.payload.playlistId) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.filter(
                (video) => video !== action.payload.videoId
              ),
            };
          } else return playlistItem;
        }),
      };
    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlistItem) => playlistItem._id !== action.payload.playlistId
        ),
      };
    case "ADD_TO_WATCH_LATER":
      return {
        ...state,
        watchlater: state.watchlater.concat(action.payload.videoId),
      };
    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchlater: state.watchlater.filter(
          (videoId) => videoId !== action.payload.videoId
        ),
      };
    default:
      return;
  }
}
