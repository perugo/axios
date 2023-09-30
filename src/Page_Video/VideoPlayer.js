import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
  const videoNode = useRef(null);
  let player;

  useEffect(() => {
    try {
      // Check if Video.js player has not been initialized already
      if (videoNode.current && !videoNode.current.player) {
        player = videojs(videoNode.current, props);
        player.playbackRate(0.3);

        // Log any video.js errors
        player.on('error', function() {
          console.error('Video.js Error:', this.error());
        });
      }
    } catch (error) {
      console.error('Video Initialization Error:', error);
    }

    return () => {
      // Dispose of any Video.js player instances on cleanup
      try {
        if (player) {
          player.dispose();
        }
      } catch (error) {
        console.error('Video Disposal Error:', error);
      }
    };
  }, [props]);

  return (
    <div data-vjs-player style={{ width: "100%", position: "relative", paddingBottom: "100%", overflow: "hidden" }}>
      <video ref={videoNode} className="video-js" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default VideoPlayer;