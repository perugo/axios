
import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import VideoWrapper from './VideoWrapper';

export const Home=()=> {  

    const videoSrc="https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/EgUgb9GQXYjQ/output.m3u8";
    return (
        <div>
          <div>
          <VideoWrapper src={videoSrc} />
          </div>
        Video Src: {videoSrc}
      </div>
    )
}
//            
