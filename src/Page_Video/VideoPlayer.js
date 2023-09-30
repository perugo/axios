import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoNode.current) {
      const videoPlayer = videojs(videoNode.current, props);
      videoPlayer.playbackRate(0.3);  // Add this line here
      setPlayer(videoPlayer);

      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, [player, props]);

  return (
<div data-vjs-player style={{ width: "100%",position:"relative",PaddingBottom:"100%",overflow:"hidden"}}>
      <video ref={videoNode} className="video-js" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default VideoPlayer;