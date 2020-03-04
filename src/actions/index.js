import * as types from "./../constants/ActionTypes";
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
    type: types.NEXT_LYRIC,
    currentSongId
});

export const restartSong = (currentSongId) => ({
    type: types.RESTART_SONG,
    currentSongId
});

export const changeSong = (newSelectedSongId) => ({
    type: types.CHANGE_SONG,
    newSelectedSongId
});



// ------------- The functions below have to do with API Call -------------


// When an action creator returns a function, that function will get executed by the Redux Thunk middleware. This function doesn't 
// need to be pure; it is thus allowed to have side effects, including executing asynchronous API calls. The function can also 
// dispatch actions... EXAMPLE: return function(dispatch) {


// First API Call to retrieve sing and capture the ID

export function fetchSongId(title) {
    return function (dispatch) {
        const localSongId = v4();
        dispatch(requestSong(title, localSongId));
        title = title.replace(' ', '_');
        let apiCall = fetch(`http://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.search?&q_track=${title}&page_size=1&s_track_rating=desc&apikey=d579483f8dc7829f5a62f424322e95c5`);
        apiCall.then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        ).then(function (response) {
            if (response.message.body.track_list.length > 0) {
                const musicMatchId = response.message.body.track_list[0].track.track_id;
                const artist = response.message.body.track_list[0].track.artist_name;
                const title = response.message.body.track_list[0].track.track_name;
                fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
            } else {
                console.log('We couldn\'t locate a song under that ID!');
            }
        });
    };
}


export const requestSong = (title, localSongId) => ({
    type: types.REQUEST_SONG,
    title,
    songId: localSongId
});


// Second API that matches the ID from first API call in order to recieve Lyrics


export function fetchLyrics(title, artist, musicMatchId, localSongId, dispatch) {

    let apiCall = fetch(`http://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${musicMatchId}&apikey=d579483f8dc7829f5a62f424322e95c5`);

    apiCall.then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    ).then(function (response) {
        if (response.message.body.lyrics) {
            let lyrics = response.message.body.lyrics.lyrics_body;
            lyrics = lyrics.replace('"', '');
            const songArray = lyrics.split(/\n/g).filter(entry => entry != "");
            dispatch(receiveSong(title, artist, localSongId, songArray));
            dispatch(changeSong(localSongId));
        } else {
            console.log('We couldn\'t locate lyrics for this song!');
        }
    });
}


export const receiveSong = (title, artist, songId, songArray) => ({
    type: types.RECEIVE_SONG,
    songId,
    title,
    artist,
    songArray,
    receivedAt: Date.now()
});



