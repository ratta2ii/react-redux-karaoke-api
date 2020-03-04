import constants from './../constants';
const { initialState, types } = constants;

const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case types.NEXT_LYRIC:
      const newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case types.RESTART_SONG:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;

    // This is requesting song from the API Call 

    case types.REQUEST_SONG:
      newSongsByIdEntry = {
        isFetching: true,
        title: action.title,
        songId: action.songId
      };
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.songId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;

    // This is recieving song from the API
    
    case types.RECEIVE_SONG:
      console.log("I am in the RECIEVE_SONG case of the lyrics reducer-------------------------: " + state[action.songId].songId);
      newSongsByIdEntry = Object.assign({}, state[action.songId], {
        isFetching: false,
        receivedAt: action.receivedAt,
        title: action.title,
        artist: action.artist,
        songArray: action.songArray,
        arrayPosition: 0,
        songId: action.songId
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.songId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;

    default:
      return state;
  }
};

export default lyricChangeReducer;
