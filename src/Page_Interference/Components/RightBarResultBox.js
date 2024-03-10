import styled from "styled-components";
import React,{useState,useEffect} from 'react';
const ResultBoxWrapper=styled.div`
`
const ResultBoxInner=styled.div`
  border:2px solid ${props=>props.cssborder};
  background-color: ${props=>props.cssbackgroundColor};
`
const LineWrapper=styled.div`
display:flex;
justify-content: flex-start;
`
const SVGWrapper=styled.div`
 display:flex
 height:45px;
 width:45px;
 margin-top:3px;
 margin-bottom:3px;
`
const SVGInner=styled.div`
  position:relative;
  width:45px;
  height:35px;
  margin:auto;
`
const ImgInnerht=styled.img`
  position:absolute;
  width:100%;
  height:100%;
  fill:blue;
`
const TextWrapper=styled.div`
  padding-top:6px;
`
const TextM=styled.span`
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 18px;
`
export const RightBarResultBox=({log})=> {
    const [success,setsuccess]=useState(false);
    useEffect(()=>{
      if(log===null || Object.keys(log).length===0){
          return;
        }
      setsuccess(log.success);
  },[log])
    return (
      <ResultBoxWrapper>
        {log && success &&(
        <ResultBoxInner cssborder="rgb(95,164,77)" cssbackgroundColor="rgb(242,250,242)">
          {success && (log.array.map(( t , index ) => (
             <LineWrapper key={index}>
              <SVGWrapper>
                <SVGInner>
                  <ImgInnerht src={`${window.location.origin}/check_mark_green.svg`} alt="SVG Logo"/>
                </SVGInner>
              </SVGWrapper>
              <TextWrapper><TextM>{t.title}</TextM></TextWrapper>
              </LineWrapper>
          )))}
        </ResultBoxInner>
        )}
        {log && !success &&(
        <ResultBoxInner cssborder="rgb(219,110,88)" cssbackgroundColor="rgb(253,244,244)">
          {!success &&(log.array.map(( t , index ) => (
              <LineWrapper key={index}>
                <SVGWrapper>
                  <SVGInner>
                    <ImgInnerht src={`${window.location.origin}/check_mark_red.svg`} alt="SVG Log"/>
                  </SVGInner>
                </SVGWrapper>
                <TextWrapper><TextM>{t.title}</TextM></TextWrapper>
              </LineWrapper>
          )))}
        </ResultBoxInner>
        )}
      </ResultBoxWrapper>
    )
  };
  