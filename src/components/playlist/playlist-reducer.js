export default function playlistReducer(state, action){
    switch(action.type){
        case "CREATE_NEW_PLAYLIST": 
            return {
                ...state,
                playlist: state.playlist.concat({ name: action.payload, videos: [] })
            }
        case "ADD_VIDEO_TO_PLAYLIST":
            return {
                ...state,
                playlist: state.playlist.map(playlistItem => {
                    if(playlistItem.name === action.payload.playlistName){
                        return {...playlistItem, videos: playlistItem.videos.concat(action.payload.video)}
                    }
                    else return playlistItem
                })
            }
        case "REMOVE_VIDEO_FROM_PLAYLIST": 
            return {
                ...state,
                playlist: state.playlist.map(playlistItem => {
                    if(playlistItem.name === action.payload.playlistName){
                        return({...playlistItem, videos: playlistItem.videos.filter(video => video.id !== action.payload.id)})
                    }
                    else return playlistItem
                })
            }
        case "REMOVE_PLAYLIST": 
            return {
                ...state,
                playlist: state.playlist.filter(playlistItem => playlistItem.name !== action.payload.playlistName)
            }
        default:
            return;
    }
}