import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoWrapper = ({ src }) => {
  const videoOptions = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: 'metadata',
    muted: true,
    sources: [{
      src,
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div style={{ width: '800px'}}>
      <VideoPlayer {...videoOptions} />
    </div>
  );
};

export default VideoWrapper;