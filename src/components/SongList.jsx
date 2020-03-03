import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSong, changeSong } from './../actions';

const SongList = ({ dispatch, songList }) => {
  // let action; (The actions below were replaced with action creators)
  return (
    <div>
      <em>Or select from our list:</em>
      {Object.keys(songList).map(songId => {
        let song = songList[songId];
        return <li key = {songId} onClick = {() => {
          if (song.arrayPosition > 0){
            // The argument is the action creator that replaced the "action"
            dispatch(restartSong(songId));
          }
          // The argument is the action creator that replaced the "action"
          dispatch(changeSong(songId));
        }}>
          {song.title} by {song.artist}</li>;
      })}
    </div>
  );
};

SongList.propTypes = {
  songList: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    songList: state.songsById
  };
};

export default connect(mapStateToProps)(SongList);
