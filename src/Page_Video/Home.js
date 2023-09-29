
import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import VideoWrapper from './VideoWrapper';

export const Home=()=> {  
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }  
    let query = useQuery();
    let videoId = query.get("v");

    //const videoSrc = `https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/${videoId}/output.m3u8`;
    const videoSrc="https://pythonmodulefol.s3.ap-northeast-1.amazonaws.com/"+videoId+"/output.m3u8";
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
