import React from 'react';
import styled from "styled-components";
import { useState,useEffect,useCallback } from 'react';

const PopupMain=styled.div`
  position:absolute;
  width:100%;
  height:100%;
  background-color:transparent;
  display: flex;
  z-index: 1; /* Ensure it's on top of other content */

`
const LeftBar=styled.div`
  width:100%;
`
const Middle=styled.div`
  min-height:400px;

`
const Middle_top=styled.div`
flex: 1;
`
const Middle_buttom=styled.div`
flex:1;
`
const MiddleBar=styled.div`
  min-width:400px;
  margin-left:auto;
  margin-right:auto;
  display:flex;
  flex-direction:column;
  height:max;
`

const Img_Wrapper=styled.div`
margin-top;100px;
  height:200px;
  display:flex-inline;
`
const Img_Inner=styled.div`
  text-align:center;
  margin-left:auto;
  margin-right:auto;
  height:200px;
  width:200px;
`
const StyledText=styled.div`
text-align:center;
margin-left:auto;
margin-right:auto;
width:200px;
height:auto;
padding-bottom:10px;
padding-top:10px;
margin-top:15px;
`
const Middle_Inner=styled.div`
  display:flex;
  flex-direction:column;
`
const RightBar=styled.div`
  width:100%;
`
const Text = styled.h2`
  margin: 0; /* Remove any default margin on the h2 element */
  color: #333; /* Text color */
`;
export default function Loading_Effect(){
  return(
    <PopupMain>
      <LeftBar>

      </LeftBar>
      <MiddleBar>
        <Middle_top/>
        <Middle>
          <Img_Wrapper>
            <Img_Inner>
              <img style={{ width: "100%", height: "100%" }} src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" alt="loading..." />
            </Img_Inner>
          </Img_Wrapper>
          <Img_Wrapper>
            <StyledText style={{width:"400px",backgroundColor:"white"}}>
              <Text>シュミレーション動画を作成中</Text>
            </StyledText>
          </Img_Wrapper>
        </Middle>

      <Middle_buttom/>
      </MiddleBar>
      <RightBar>
      </RightBar>
    </PopupMain>
  )
}