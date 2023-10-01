
import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
//import NewVideoPlayer from './NewVideoPlayer';
import HLSJSPlayer from './HLSJSPlayer';
const videoSrc="https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/EgUgb9GQXYjQ/output.m3u8";
export const Home=()=> {  

    
    return (
        <div>
          <div>
          
          <HLSJSPlayer src={videoSrc}></HLSJSPlayer>
          </div>
        Video Src: {videoSrc}
      </div>
    )
}
//<NewVideoPlayer src={videoSrc} />
//                      <VideoWrapper src={videoSrc} />
