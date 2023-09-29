import styled from "styled-components";
import React from 'react';
const Container=styled.div`
  margin-bottom:15px;
  margin-left:10px;
`
const Letter=styled.h3`
  margin-top:5px;
  margin-bottom:5px;
  font-size:20px;
  text-align:center;
`
export const Header=()=> {
    return (
    <Container>
        <Letter>電磁波の干渉を観測する
        </Letter>
    </Container>
    )
  };
  