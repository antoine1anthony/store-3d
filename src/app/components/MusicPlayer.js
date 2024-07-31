"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Slider, Typography, Select, MenuItem } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, Shuffle } from '@mui/icons-material';
import Scene from './ThreeAudioPlayer';

const MusicPlayer = ({ playlists }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const isTransitioningRef = useRef(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsPlaying(false);
    const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
    setCurrentIndex(nextIndex);
    setTimeout(() => {
      setIsPlaying(true);
      isTransitioningRef.current = false;
    }, 0);
  };

  const prevSong = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsPlaying(false);
    const prevIndex = (currentIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
    setCurrentIndex(prevIndex);
    setTimeout(() => {
      setIsPlaying(true);
      isTransitioningRef.current = false;
    }, 0);
  };

  const shufflePlaylist = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsPlaying(false);
    const shuffledPlaylist = [...currentPlaylist.songs].sort(() => Math.random() - 0.5);
    setCurrentPlaylist({ ...currentPlaylist, songs: shuffledPlaylist });
    setIsShuffled(!isShuffled);
    setTimeout(() => {
      setIsPlaying(true);
      isTransitioningRef.current = false;
    }, 0);
  };

  const handlePlaylistChange = (event) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsPlaying(false);
    setCurrentPlaylist(playlists.find(pl => pl.name === event.target.value));
    setCurrentIndex(0);
    setTimeout(() => {
      setIsPlaying(true);
      isTransitioningRef.current = false;
    }, 0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">{currentPlaylist.name}</Typography>
      <Select value={currentPlaylist.name} onChange={handlePlaylistChange}>
        {playlists.map((playlist) => (
          <MenuItem key={playlist.name} value={playlist.name}>{playlist.name}</MenuItem>
        ))}
      </Select>
      <Typography variant="h6">{currentPlaylist.songs[currentIndex].title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={prevSong}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={nextSong}>
          <SkipNext />
        </IconButton>
        <IconButton onClick={shufflePlaylist}>
          <Shuffle color={isShuffled ? "secondary" : "inherit"} />
        </IconButton>
      </Box>
      <Slider
        value={0}
        max={100}
      />
      <Scene currentSong={currentPlaylist.songs[currentIndex].url} isPlaying={isPlaying} />
    </Box>
  );
};

export default MusicPlayer;
