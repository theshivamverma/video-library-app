import  playlistReducer  from "./playlist.reducer";

describe("testing playlist reducer", () => {

    test("should load playlists data from api", () => {
        const initialState = {
            playlist: [],
            watchlater: []
        }

        const action = {
          type: "LOAD_DATA",
          payload: {
            playlistData: [
              {
                name: "My Playlist",
                videos: [111, 222, 333],
                _id: 121212,
              },
            ],
            watchlaterData: [111, 321, 434]
          },
        };

        const state = playlistReducer(initialState, action)

        expect(state).toEqual({
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
          ],
          watchlater: [111, 321, 434],
        });
    })

    test("should create a new playlist", () => {
        const initialState = {
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
          ],
          watchlater: [111, 321, 434],
        };

        const action = {
          type: "CREATE_NEW_PLAYLIST",
          payload: {
            name: "test",
            _id: 777343,
            videos: [],
          },
        };

        const state = playlistReducer(initialState, action)

        expect(state).toEqual({
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [],
            },
          ],
          watchlater: [111, 321, 434],
        });
    })

    test("should add a video to playlist", () => {
        const initialState = {
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [],
            },
          ],
          watchlater: [111, 321, 434],
        };

        const action = {
          type: "ADD_VIDEO_TO_PLAYLIST",
          payload: {
              playlistId: 777343,
              videoId: 987
          }
        };

        const state = playlistReducer(initialState, action)

        expect(state).toEqual({
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [987],
            },
          ],
          watchlater: [111, 321, 434],
        });
    })

    test("should remove video from a playlist", () => {
        const initialState = {
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 222, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [987],
            },
          ],
          watchlater: [111, 321, 434],
        }

        const action = {
            type: "REMOVE_VIDEO_FROM_PLAYLIST",
            payload: {
                playlistId: 121212,
                videoId: 222
            }
        }

        const state = playlistReducer(initialState, action)

        expect(state).toEqual({
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [987],
            },
          ],
          watchlater: [111, 321, 434],
        });
    })

    test("should add to watch later", () => {
        const initialState = {
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [987],
            },
          ],
          watchlater: [111, 321, 434],
        };

        const action = {
          type: "ADD_TO_WATCH_LATER",
          payload: { videoId: 444 },
        };

        const state = playlistReducer(initialState, action)

        expect(state).toEqual({
          playlist: [
            {
              name: "My Playlist",
              videos: [111, 333],
              _id: 121212,
            },
            {
              name: "test",
              _id: 777343,
              videos: [987],
            },
          ],
          watchlater: [111, 321, 434, 444],
        })
    })

    test("should remove from watch later", () => {
      const initialState = {
        playlist: [
          {
            name: "My Playlist",
            videos: [111, 333],
            _id: 121212,
          },
          {
            name: "test",
            _id: 777343,
            videos: [987],
          },
        ],
        watchlater: [111, 321, 434],
      };

      const action = {
        type: "REMOVE_FROM_WATCH_LATER",
        payload: { videoId: 434 },
      };

      const state = playlistReducer(initialState, action);

      expect(state).toEqual({
        playlist: [
          {
            name: "My Playlist",
            videos: [111, 333],
            _id: 121212,
          },
          {
            name: "test",
            _id: 777343,
            videos: [987],
          },
        ],
        watchlater: [111, 321],
      });
    });

     test("should remove playlist", () => {
       const initialState = {
         playlist: [
           {
             name: "My Playlist",
             videos: [111, 333],
             _id: 121212,
           },
           {
             name: "test",
             _id: 777343,
             videos: [987],
           },
         ],
         watchlater: [111, 321, 434],
       };

       const action = {
         type: "REMOVE_PLAYLIST",
         payload: { playlistId: 777343 },
       };

       const state = playlistReducer(initialState, action);

       expect(state).toEqual({
         playlist: [
           {
             name: "My Playlist",
             videos: [111, 333],
             _id: 121212,
           },
         ],
         watchlater: [111, 321, 434],
       });
     });
})