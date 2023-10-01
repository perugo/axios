import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const HLSJSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;  // Define the 'hls' variable here

    if (Hls.isSupported()) {
      hls = new Hls();  // Initialize the 'hls' variable here
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // If native HLS support is available in the browser
      video.src = src;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }

    return () => {
      // Cleanup on component unmount
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls width="640" height="360" muted/>;
};

export default HLSJSPlayer;