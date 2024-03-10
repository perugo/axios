import styled from "styled-components";
import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
const Container = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const AppTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 20px; // 追加のマージンを提供してコンテンツとの間にスペースを設ける
`;
const ImageBox = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-left:10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  max-width: 100%; 
  max-height: 100%;
  width: auto;
  height: auto;
  position:absolute;
`;
const ImageWrapper = styled.div`
  width: 250px;  // Desired width
  height: 250px; // Desired height
  display: flex;
  justify-content: center; // Center the image horizontally
  align-items: center;     // Center the image vertically
  overflow: hidden;        // This will clip any overflowing parts of the image
  margin: 0 auto;          // Center the ImageWrapper within ImageBox
  position:relative;
`;
const Title = styled.h2`
  font-size: 16px;
  margin: 8px 0;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 12px;
  margin: 4px 0;
  color: #666;
  text-align: center;
`;
export const Home = () => {
  return (
    <div className="App">
       <AppTitle>電磁波シュミレーション</AppTitle>
    <Wrapper>
    <Link to="/interference" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ImageBox>
      <ImageWrapper>
        <Image src={`${window.location.origin}/interferenceTop.png`} alt={"画像"} />
        </ImageWrapper>
        <Title>２素子アレーアンテナの物理現象</Title>
        <Description>波の干渉を観察できます</Description>
      </ImageBox>
      </Link>

      <ImageBox>
        <ImageWrapper>
        <Image style={{zIndex:"1",maxHeight:"80%",maxWidth:"80%"}} src={`${window.location.origin}/jyunbichu.png`} alt={"画像"} />
        <Image style={{zIndex:"0",}} src={`${window.location.origin}/wavedrawTop.png`} alt={"画像"} />
        </ImageWrapper>
        <Title>電磁波シュミレーション</Title>
        <Description>自由に媒質や周波数を設定できます</Description>
      </ImageBox>
    </Wrapper>
    </div>
  );
};