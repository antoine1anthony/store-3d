import React from 'react';
import MusicPlayer from './components/MusicPlayer';

const playlists = [
  {
    name: 'Playlist 1',
    songs: [
      { title: 'Song 1', url: '/assets/audio/playlist_1.ogg' },
      { title: 'Song 2', url: '/assets/audio/song_1.ogg' },
      // Add more songs here
    ]
  },
  {
    name: 'Playlist 2',
    songs: [
      { title: 'Song A', url: '/assets/audio/song_1.ogg' },
      { title: 'Song B', url: '/assets/audio/playlist_1.ogg' },
      // Add more songs here
    ]
  }
];

const HomePage = () => (
  <div>
    <h1>Music Player</h1>
    <MusicPlayer playlists={playlists} />
  </div>
);

export default HomePage;
