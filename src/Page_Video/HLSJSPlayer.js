import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const HLSJSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;  // Define the 'hls' variable here


    video.playbackRate = 0.3; // Set the playback speed


    if (Hls.isSupported()) {
      hls = new Hls();  // Initialize the 'hls' variable here
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().then(() => {
            video.playbackRate = 0.3;  // Set the playback speed after the video starts playing
          });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // If native HLS support is available in the browser
      video.src = src;
      video.addEventListener('loadedmetadata', function () {
        video.play().then(() => {
            video.playbackRate = 0.3;  // Set the playback speed after the video starts playing
          });
      });
    }

    return () => {
      // Cleanup on component unmount
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls style={{ width: '800px', height: 'auto' }} muted/>;
};

export default HLSJSPlayer;