import styled from "styled-components";
import React, { useState, useEffect, useRef } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './../../Components/SliderOverride.css';
import {
  Box, FrontHeader, FrontHeaderInner, TitleWrapper, CustomH3, FrontBody,
  ColumnLayout, GridColumn, FrontHeaderLeft, SliderWrapper,
  OutlinedButtonContainer, OutlinedButtonText,
  RadioButton, RadioButtonInput
} from './StyledBoxComponents';
const SpanText = styled.span`
font-size:14px;
font-weight:500;
line-height:20px;
color:rgb(40,40,40);
margin-bottom:2px;
`



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

export const BoxAntenna = ({ antenna, setAntenna }) => {
  const timeoutIdRef = useRef(null);
  const reserveIdRef = useRef(null);
  const [dispAntGap, setDispAntGap] = useState(antenna.antGap);
  const [antGapMarks, setAntGapMarks] = useState({});
  const [antGapMin, setAntGapMin] = useState(0);
  const [antGapMax, setAntGapMax] = useState(0);
  const [dispPhase, setDispPhase] = useState(antenna.phase);
  const [dispN, setDispN] = useState(antenna.N);

  const prevAntenna = useRef(null);
  const readOnce = useRef(false);

  useEffect(() => {
    if (!checker_ANTENNA(antenna)) return;
    if (checker_NOCHANGE(antenna, prevAntenna.current)) return;
    if (!readOnce.current) {
      const initialMarks = makeAntGapInitialMarks(setAntGapMin, setAntGapMax);
      setAntGapMarks(initialMarks);
    }

    console.log("BoxAntenna everything else");
    const { antGap, phase, N } = antenna;
    setDispAntGap(antGap);
    setDispPhase(phase);
    setDispN(N);
    console.log("N:: " + N);
    readOnce.current = true;
    prevAntenna.current = antenna;
    return () => {
      //clearTimeout(reserveIdRef.current);
    };
  }, [antenna])
  const handleAntGapSliderChanged = (newValue) => {
    setDispAntGap(newValue / 100);
  }
  const handleNSliderChanged = (newValue) => {
    setDispN(newValue);
  }
  const handlePhaseSliderChanged = (newValue) => {
    var boolean = false;
    var marks = Object.keys(customMarks);
    for (var i = 0; i < marks.length; i++) {
      var markValue = parseInt(marks[i]);
      if (markValue - 1 <= newValue && newValue <= markValue + 1) {
        setDispPhase(markValue)
        boolean = true;
      }
    }
    if (boolean === false) {
      setDispPhase(newValue)
    }
  }

  useEffect(() => {
    if (reserveIdRef.current) {
      clearTimeout(reserveIdRef.current);
    }
    reserveIdRef.current = setTimeout(() => {
      setAntenna({ ...antenna, antGap: dispAntGap, phase: dispPhase, N: dispN });
      reserveIdRef.current = null;
    }, 600);

    if (timeoutIdRef.current) return;
    setAntenna({ ...antenna, antGap: dispAntGap, phase: dispPhase, N: dispN });
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
    }, 200);

    return () => {
      if (reserveIdRef.current) {
        clearTimeout(reserveIdRef.current)
      }
    };
  }, [dispAntGap, dispPhase,dispN]);

  return (
    <Box>
      <FrontHeader>
        <FrontHeaderInner>
          <FrontHeaderLeft>
            <TitleWrapper>
              <CustomH3>多素子 (任意設定)</CustomH3>
            </TitleWrapper>

          </FrontHeaderLeft>
        </FrontHeaderInner>
      </FrontHeader>

      <FrontBody>
        <ColumnLayout>
          <GridColumn>
            <TextRow>
              <Text style={{ fontSize: "13px", paddingRight: "4px" }}>アンテナ間の距離: </Text>
              <Text>{setterDisplay(dispAntGap)}</Text>
            </TextRow>
            <SliderWrapper>
              <Slider
                value={dispAntGap * 100}
                min={antGapMin}
                max={antGapMax}
                marks={antGapMarks}
                onChange={handleAntGapSliderChanged}
                railStyle={{ backgroundColor: '#ddd', borderRadius: "5px", height: "8px" }}
                trackStyle={{ backgroundColor: 'rgb(60,60,235)', borderRadius: "5px", height: "8px" }}
                handleStyle={{ fontSize: '18px' }}
              />
            </SliderWrapper>
            <div style={{ width: "100%", height: "3px" }}></div>
            <TextRow>
              <Text style={{ fontSize: "13px", paddingRight: "4px" }}>アンテナ間の位相差[rad]: </Text>
              <Text>{dispPhase}</Text>
            </TextRow>
            <SliderWrapper>
              <Slider
                value={dispPhase}
                min={0}
                max={359}
                marks={customMarks}
                onChange={handlePhaseSliderChanged}
                railStyle={{ backgroundColor: '#ddd', borderRadius: "5px", height: "8px" }}
                trackStyle={{ backgroundColor: 'rgb(60,60,235)', borderRadius: "5px", height: "8px" }}
                handleStyle={{ fontSize: '18px' }}
              />
            </SliderWrapper>
            <TextRow>
              <Text style={{ fontSize: "13px", paddingRight: "4px" }}>アンテナ素子の数: </Text>
              <Text>{dispN}</Text>
            </TextRow>
            <SliderWrapper>
              <Slider
                value={dispN}
                min={2}
                max={20}
                marks={Nmarks}
                onChange={handleNSliderChanged}
                railStyle={{ backgroundColor: '#ddd', borderRadius: "5px", height: "8px" }}
                trackStyle={{ backgroundColor: 'rgb(60,60,235)', borderRadius: "5px", height: "8px" }}
                handleStyle={{ fontSize: '18px' }}
              />
            </SliderWrapper>
          </GridColumn>
        </ColumnLayout>
      </FrontBody>
    </Box>
  )
};
const fractions = {
  0: "0",
  0.25: "1/4",
  0.5: "1/2",
  0.75: "3/4",
  1.0: "",
  1.25: "5/4",
  1.5: "3/2",
  1.75: "7/4",
  2.0: "2",
}
const Nmarks = {
  2: "2",
  5: "5",
  10: "10",
  20: "20",
  30: "30"
}
const customMarks = {
  0: '0°',
  45: '45°',
  90: '90°',
  180: '180°',
  270: '270°',
  359: '359°',
};
export function checker_ANTENNA(obj) {
  if (!obj) return false;
  const requiredFields = {
    DomainWidLambda: (data) => typeof data === 'number',
    antGap: (data) => typeof data === 'number',
    phase: (data) => typeof data === 'number',
    N: (data) => typeof data === 'number' && data % 1 === 0 && data >= 2 && data <= 30,
  }
  return Object.keys(requiredFields).every(key => requiredFields[key](obj[key]));
}
export function checker_NOCHANGE(obj1, obj2) {
  if (!obj1 || !obj2) return false;
  const antennaFields = ['DomainWidLambda', 'antGap', 'phase','N'];
  if (fieldsMatch(obj1, obj2, antennaFields)) return true;
  return false;
}

export function fieldsMatch(obj1, obj2, fields) {
  return fields.every(field => obj1[field] === obj2[field]);
}

const makeAntGapInitialMarks = (setAntGapMin, setAntGapMax) => {
  const initialMarks = {};
  let i = 0;
  setAntGapMin(i);
  for (; i <= 100; i += 5) {
    if (i % 10 === 0) {
      initialMarks[i] = (i / 100).toString() + " λ";
    }
    if (i === 25) {
      initialMarks[i] = "1/4 λ";

    }
  }
  i = 0;
  setAntGapMax(100);
  return initialMarks;
}
const setterDisplay = (value) => {
  return (fractions[value] ?? value.toString()) + " λ";
}

