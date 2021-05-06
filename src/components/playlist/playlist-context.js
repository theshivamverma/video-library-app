import { createContext, useContext, useReducer } from "react"
import { playlistReducer } from "../playlist"
const PlaylistContext = createContext();

const initialState = {
    playlist: [
        {
            name: "My playlist",
            videos: []
        }
    ]
}

export function PlaylistProvider({ children }){

    const [state, dispatch] = useReducer(playlistReducer, initialState)

    return(
        <PlaylistContext.Provider value={{ playlist: state.playlist, playlistDispatch : dispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export function usePlaylist(){
    return useContext(PlaylistContext)
}