import styled from "styled-components";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import React,{useState,useEffect,useRef} from 'react';
import './../Components/SliderOverride.css';
import Graph from './Graph';
import { Antenna_Canvas } from "./../Components/Antenna_Canvas";

const MainContentWrapper=styled.div`
  padding-left:10px;
  padding-right:10px;
  padding-top:20px;
`
const MainContentInner=styled.div`
padding-top:16px;
padding-bottom:20px;
position:relative;
display: inline-block;
display:flex;
@media screen and (max-width:800px){
  flex-direction:column;
}
`
const ButtonDownloadWrapper=styled.div`
margin-top:30px;
margin-bottom:15px;
text-align: center
`
const ButtonDownload=styled.div`
backface-visibility: hidden;
background-color:rgb(255,153,0);
border: 0;
border-radius: .3rem;
box-sizing: border-box;
color:rgb(0,0,0);
cursor: pointer;
display: inline-block;
font-family: Circular,Helvetica,sans-serif;
font-size: 1.2rem;
font-weight: 700;
line-height: 1.3;
padding: 10px 20px;
position: relative;
text-align: left;
text-decoration: none;
transition: transform .2s;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;

&:hover{
  background-color:rgb(236,114,17);
}
`
const LeftSide=styled.div`
 width:550px;
`
const RightSide=styled.div`
  margin-bottom:5px;
  margin-left:10px;
  margin-top:5px;
  width:500px;
  background-color:rgb(240,240,240);
  padding-left:20px;
  padding-right:20px;
  padding-top:20px;
`

const SettingWrapper=styled.div`
padding-top:20px;
`
const SettingBoxContent=styled.div`
padding-top:16px;
padding-bottom:20px;
`
const Front=styled.div`
position:relative;
`
const FrontWrapper=styled.div`
  box-sizing:border-box;
  background-color:rgb(255,255,255);
  border-spacing:0;
  cursor:auto;
  direction 1tr;
  empty-cells:show;
  hyphens:none;
  tab-size:8;
  text-align:left;
  text-indent:0;
  text-transform:none;
  widows:2;
  word-spacing:normal;
  font-weight:400;
  -webkit-font-smoothing:auto;
  word-break:bread-word;
  display:block;
  position:relative;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &::before{
    content:"";
    position:absolute;
    left:0px;
    width:100%;
    height:100%;
    pointer-events:none;
    box-sizing:border-box;
    border-top: 1px solid #eaeded;
    z-index:1;
  }
  &::after{
    content:"";
    position:absolute;
    left:0px;
    top:0px;
    width:100%;
    height:100%;
    pointer-events:none;
    box-sizing:border-box;
    box-shadow:0 1px 1px 0 rgba(0,28,36,0,3) 1px 1px 1px 1px 0 rgba(0,28,36,0.15), -1px 1px 1px 0 rgba(0,28,36,0.15);
    mix-blend-mode:multiply;
  }

`


const FrontHeader=styled.div`
  border-bottom:1px solid #eaeded;
  background-color: rgb(250,250,250);

`
const FrontHeaderInner=styled.div`
 width:100%;
 display:flex;
 padding:10px 20px 10px 20px;
 box-sizing:border-box;
 border:none;
 line-height 22px;
 tex-align:left;
 justify-content:space-between;
`
const TitleWrapper=styled.div`
padding-top:4px;
flex-wrap:wrap;
justify-content:space-between;

`
const TitleInner=styled.div`
  font-size:18px;
  padding:4px 0 0px 0px;
  min-width:0;
  color:#16191f;

`
const CustomH3=styled.div`
 font-size:24px;
 letter-spacing:normal;
 font-weight:500;
 -webkit-font-smoothing:auto;
 margin:0;
 display:inline;
 margin-right:8px;
 margin:0px;
 color:rgb(40,40,40);
`
const FrontBody=styled.div`
position:relative;
padding-top:16px;
padding:30px 40px 30px 40px;
`
const FrontHeaderLeft=styled.div`
line-height:none;
display:flex;
flex-direction:row;
`
const Container = styled.div`
  margin-bottom:5px;
  margin-left:10px;
  position:relative;
  display: flex;
  flex-direction: row; // default to row
  
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export const Home=({setting,change_from_left,changepage})=> {
  const [deg, setDeg] = useState(0);//設定中のtmp位相差
  const [d,setd]=useState(0);//設定画面のtmpアンテナ間の間隔
  const [dispd,setdispd]=useState(0);//rc-sliderが少数点の値を扱えないため、d*100したもの
  const [graphdeg,setgraphdeg]=useState(0);
  const [array,setarray]=useState({});
  const timeoutIdRef = useRef();
  const [textd,settextd]=useState('');
  const [marks,setMarks]=useState({});
  const [d_max,set_d_max]=useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleSliderChange = (newValue) => {
    var boolean=false;
    var marks = Object.keys(customMarks);
    for (var i = 0; i < marks.length; i++) {
      var markValue = parseInt(marks[i]);
      if (markValue - 3 <= newValue && newValue <= markValue + 3) {
        setDeg(markValue)
        boolean=true;
      }
    }
    if(boolean===false){
      setDeg(newValue)
    }
  };
  

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/^0+/, ''); // Remove leading zeros
    if(sanitizedValue===''){
      setDeg(0);
    }else if(/^\d*$/.test(sanitizedValue)) {
      const numericValue = parseInt(sanitizedValue, 10);
      if (numericValue >= 0 && numericValue <= 359) {
        setDeg(numericValue);
      }
    }
  };
  const handleSliderChanged = (newValue) => {
    setdispd(newValue)
    setd(newValue/100.0)
    settextd(newValue/100.0);
};

  const handleChange_d = (event) => {
    settextd(event.target.value);
    const numericValue=parseFloat(event.target.value);

    if(!isNaN(numericValue)){
      if (numericValue >= 0.2 && numericValue <= 5.0) {
        setd(numericValue)
        setdispd(numericValue*100.0)
      }
    }
  };
  const handleTimeout = () => {
    var o={};
    o['lambda_field']=setting['lambda_field'];
    o['d']=d;
    o['deg']=deg;
    o['lambda']=setting['lambda'];
    setarray(o);
    setgraphdeg(deg);

  };

  const startTimer = () => {
    timeoutIdRef.current = setTimeout(handleTimeout, 600);
  };
  useEffect(() => {
    startTimer();
    if(setting!==null){
      setDeg(setting.deg);
      setd(setting.d);
      setarray(setting);
      setdispd(setting.d*100.0)
      settextd(setting.d)
      set_d_max(parseInt(setting.lambda_field*0.8)*100);
      const initialMarks = {};
      for (let i = 25; i <parseInt(setting.lambda_field*0.8)*100; i+= 25) {
        initialMarks[i]=' ';
      }
      setMarks(initialMarks);
    }
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [setting]);
  
  const call_change_from_left=()=>{
    var o={};
    o['lambda_field']=setting['lambda_field'];
    o['d']=d;
    o['deg']=deg;
    o['lambda']=setting['lambda'];
    o['dx']=setting['dx'];
    change_from_left(o);
    changepage('home');
  }

  const customMarks = {
    0: '0',
    45:'45',
    90: '90',
    180: '180',
    270: '270',
    359: '359',
  };
  useEffect(()=>{
    clearTimeout(timeoutIdRef.current);
    startTimer();
  },[deg,d])
  useEffect(()=>{
  },[array,marks])

    return (
    <MainContentWrapper>

      <MainContentInner>
        <Container>
          <LeftSide>
            <Antenna_Canvas setting={array}></Antenna_Canvas>
            <Graph graphdeg={graphdeg}/>
          </LeftSide>
          <RightSide>
            <SettingBoxContent>
              <Front>
                <FrontWrapper>

                  <FrontHeader>
                    <FrontHeaderInner>
                      <FrontHeaderLeft>
                        <TitleWrapper>
                          <TitleInner>
                            <CustomH3 style={{margin:0}}>位相差の設定</CustomH3>
                          </TitleInner>
                        </TitleWrapper>
                      </FrontHeaderLeft>
                    </FrontHeaderInner>
                  </FrontHeader>
                  <FrontBody>
                    <Slider
                      value={deg}
                      min={0}
                      max={359}
                      onChange={handleSliderChange}
                      marks={customMarks}
                      railStyle={{backgroundColor:'#ddd',borderRadius:"5px",height:"10px"}}
                      trackStyle={{backgroundColor:'rgb(60,60,235)',borderRadius:"5px",height:"10px"}}
                      handleStyle={{fontSize:'18px'}}
                    />
                    <div style={{paddingTop:"40px"}}>　</div>
                      <input style={{fontSize:"18px"}}
                        type="text"
                        value={deg}
                        onChange={handleChange}
                        pattern="[0-9,]*"
                      />
                    <div>位相差 : {deg} °</div>

                  </FrontBody>
                </FrontWrapper>
              </Front>
            </SettingBoxContent>
            <SettingBoxContent>
              <Front>
                <FrontWrapper>
                  <FrontHeader>
                    <FrontHeaderInner>
                      <FrontHeaderLeft>
                        <TitleWrapper>
                          <TitleInner>
                            <CustomH3 style={{margin:0}}>アンテナ間の距離の設定</CustomH3>
                          </TitleInner>
                        </TitleWrapper>
                      </FrontHeaderLeft>
                    </FrontHeaderInner>
                  </FrontHeader>
                  <FrontBody>
                    <Slider
                      value={dispd}
                      min={20}
                      max={d_max}
                      step={null}
                      marks={marks}
                      onChange={handleSliderChanged}
                      railStyle={{backgroundColor:'#ddd',borderRadius:"5px",height:"10px"}}
                      trackStyle={{backgroundColor:'rgb(60,60,235)',borderRadius:"5px",height:"10px"}}
                      handleStyle={{fontSize:'18px'}}
                    />
                    <div style={{paddingTop:"40px"}}>　</div>
                    <input style={{fontSize:"18px"}}
                      type="text"
                      value={textd}
                      onChange={handleChange_d}
                      pattern="[0-9.]*"
                    />
                    <div>アンテナ間の距離 : {d} λ</div>
                  </FrontBody>
                </FrontWrapper>
              </Front>
            </SettingBoxContent>
            <ButtonDownloadWrapper>
              <ButtonDownload onClick={call_change_from_left}>変更を更新</ButtonDownload>
            </ButtonDownloadWrapper>
          </RightSide>
        </Container>
      </MainContentInner>
    </MainContentWrapper>
    )
  };
  