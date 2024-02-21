import styled from "styled-components";
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, FrontHeader, FrontHeaderInner, TitleWrapper, CustomH3, FrontBody,
  ColumnLayout, GridColumn, FrontHeaderLeft,
  RadioButton,RadioButtonInput
} from './StyledBoxComponents';


const TextRow = styled.div`
display:flex;
flex-direction:row;
line-height:16px;
`
const Text = styled.div`
font-size:18px;
margin:0;
padding:0;
`


const ContentBodyRow = styled.div`
  margin-bottom:2px;
  margin-left:-8px;
  position:relative;
  display: inline-block;
  display:flex;
  cursor:pointer;
`
const ContentBodyRow2 = styled.div`
  margin-bottom:1px;
  position:relative;
  display:flex;
  cursor:pointer;
  line-height:20px;
  align-items:center;
`

const WaveFormList = styled.div`
  margin-left:-7px;
`
const Label = styled.div`
  margin-left:6px;
  text-align:left;
  font-size:14px;
  margin-top:3px;
  font-weight: 500;
`
const antennaConfigTypeSelection = [
  { name: "標準設定 (二素子)" },
  { name: "多素子 (任意設定)" }
];

export const BoxAntennaConfigType = ({ antennaConfigType,setAntennaConfigType }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeObjectIndex = (index) => {
    if (index === 0) setAntennaConfigType("default");
    if (index === 1) setAntennaConfigType("custom");
  }
  useEffect(() => {
    if (antennaConfigType === "default") setSelectedIndex(0);
    if (antennaConfigType === "custom") setSelectedIndex(1);
  }, [antennaConfigType])
  return (
    <Box>
      <FrontHeader>
        <FrontHeaderInner>
          <FrontHeaderLeft>
            <TitleWrapper>
              <CustomH3>設定</CustomH3>
            </TitleWrapper>
          </FrontHeaderLeft>
        </FrontHeaderInner>
      </FrontHeader>

      <FrontBody>
        <ColumnLayout>
          <GridColumn>
            <WaveFormList>
              {antennaConfigTypeSelection.map((v, index) => (
                <ContentBodyRow2 key={index} onClick={() => changeObjectIndex(index)}>
                  <RadioButton>
                    <RadioButtonInput
                      type="radio"
                      checked={selectedIndex === index}
                      readOnly
                    />
                  </RadioButton>
                  <Label style={{marginTop:"1px"}}>{v.name}</Label>
                </ContentBodyRow2>
              ))}
            </WaveFormList>
          </GridColumn>
        </ColumnLayout>
      </FrontBody>
    </Box>
  )
};
