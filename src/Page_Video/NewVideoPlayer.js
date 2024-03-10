import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const NewVideoPlayer = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            preload: 'auto',
            sources: [{
                src: src,
                type: 'application/x-mpegURL' // Assuming HLS format, adjust accordingly
            }]
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [src]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js" />
        </div>
    );
};

export default NewVideoPlayer;