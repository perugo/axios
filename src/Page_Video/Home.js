
import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
//import NewVideoPlayer from './NewVideoPlayer';
import HLSJSPlayer from './HLSJSPlayer';
const videoSrc="https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/EgUgb9GQXYjQ/output.m3u8";
export const Home=()=> {  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
}  
let query = useQuery();
let videoId = query.get("v");
const videoSrc="https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/"+videoId+"/output.m3u8";
    
    return (
        <div>
          <div>
          
          <HLSJSPlayer src={videoSrc}></HLSJSPlayer>
          </div>
      </div>
    )
}
//<NewVideoPlayer src={videoSrc} />
//                      <VideoWrapper src={videoSrc} />
