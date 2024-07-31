"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ThreeAudioPlayer = ({ currentSong, isPlaying }) => {
  const [audioLoader] = useState(() => new THREE.AudioLoader());
  const [listener] = useState(() => new THREE.AudioListener());
  const sound = useRef(new THREE.PositionalAudio(listener));
  const mesh = useRef();

  const { camera } = useThree();

  useEffect(() => {
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, [camera, listener]);

  useEffect(() => {
    const stopCurrentSong = () => {
      if (sound.current.isPlaying) {
        sound.current.stop();
      }
    };

    const loadNewSong = () => {
      console.log('Loading audio:', currentSong);
      audioLoader.load(currentSong, (buffer) => {
        sound.current.setBuffer(buffer);
        sound.current.setRefDistance(20);
        if (isPlaying) {
          console.log('Playing audio:', currentSong);
          sound.current.play();
        }
      });
    };

    stopCurrentSong();
    loadNewSong();
  }, [audioLoader, currentSong, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      console.log('Resuming audio:', currentSong);
      sound.current.play();
    } else {
      console.log('Pausing audio:', currentSong);
      sound.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color={0xff2200} />
      <primitive object={sound.current} />
    </mesh>
  );
};

const Scene = ({ currentSong, isPlaying }) => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <ThreeAudioPlayer currentSong={currentSong} isPlaying={isPlaying} />
  </Canvas>
);

export default Scene;
