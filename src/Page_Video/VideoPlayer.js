import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
  const videoNode = useRef(null);
  let player;

  useEffect(() => {
    // Check if Video.js player has not been initialized already
    if (videoNode.current && !videoNode.current.player) {
      player = videojs(videoNode.current, props);
      player.playbackRate(0.3);
    }

    return () => {
      // Dispose of any Video.js player instances on cleanup
      if (player) {
        player.dispose();
      }
    };
  }, [props]);
  

  return (
<div data-vjs-player style={{ width: "100%",position:"relative",PaddingBottom:"100%",overflow:"hidden"}}>
      <video ref={videoNode} className="video-js" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default VideoPlayer;