import styled from "styled-components";
import { RightBarResultBox } from './RightBarResultBox';
import React,{useState,useEffect} from 'react';
import { Box } from './Box';
const Container=styled.div`
  margin-bottom:5px;
  margin-left:10px;
  padding-left:10px;
  padding-right:10px;
  margin-top:5px;
  width:500px;
  background-color:rgb(240,240,240);

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

const TextNumber=styled.span`
  font:100% times new roman,serif;
  line-height:1.2;
  font-size:1.2em;
`

const TextM=styled.div`
  line-height:1.2;
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 1.2em;
`
const SettingWrapper=styled.div`
padding-top:20px;
`
const ItemWrapper=styled.div`
padding-top:10px;
`
const SVGInner=styled.div`
  position:relative;
  width:25px;
  height:25px;
  margin:auto;
  stroke-width:2;
  stroke-linejoin:round;
  transform: ${props =>(props.showAdvancedSettings ? 'rotate(0)' : 'rotate(270deg)')};
`
const SVGWrapper=styled.div`
  display:flex
  height:35px;
  width:35px;
  margin-top:3px;
  margin-bottom:3px;
  
  &:hover
`;
const AdvancedText=styled.div`
margin-top:5px;
margin-left:7px;
`
const AdvancedWrapper=styled.div`
  padding-top:10px;
  display:flex;
  ${SVGInner}{
    stroke:rgb(70,70,70);
    fill:rgb(70,70,70);
  }
  &:hover ${SVGInner}{
    stroke:rgb(20,20,20);
    fill:rgb(20,20,20);
  }
  ${AdvancedText}{
    color:rgb(70,70,70);
  }
  &:hover ${AdvancedText}{
    color:rgb(20,20,20);

  }
`

export const RightBar=({log,setting,changepage,call_postapi})=> {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [settingbox,setsettingbox]=useState({});
  const [advancedsettingbox,setadvancedsettingbox]=useState({});
  useEffect(()=>{
    if(setting!==null){
      var o=makesettingbox(setting);
      var a=makeadvancedsettingbox(setting);
      setsettingbox(o);
      setadvancedsettingbox(a);
    }
  },[log,setting])

  function makesettingbox(set){
    var basicsetting={};
    basicsetting['title']="設定";
    basicsetting['show']=true;
    basicsetting['array']=[];
    basicsetting['array'].push({
      "title": "アンテナ間の間隔 [d]",
      "value":makestr(set['d'],"d= ","λ")
    });
    basicsetting['array'].push({
      "title": "アンテナ間の位相差 [θ]",
      "value":makestr(set['deg'],"θ= ","°")
    });
    basicsetting['button']=[];
    basicsetting['button'].push({
      "title":"設定を開く",
      "page":"setting"
    });
    return basicsetting;
  }

  function makeadvancedsettingbox(set){
    var advancedsetting={};
    advancedsetting['title']="詳細設定";
    advancedsetting['show']=true;
    advancedsetting['array']=[];
    var str_lambda=formatLength(set['lambda']);
    advancedsetting['array'].push({
      "title": "波長 [λ]",
      "value":str_lambda
    });
    advancedsetting['array'].push({
      "title": "フィールドの幅",
      "value":makestr(set['lambda_field'],"","λ")
    });
    advancedsetting['array'].push({
      "title": "空間離散間隔",
      "value":makestr("1/"+set['dx'],"","λ")
    });
    advancedsetting['button']=[];
    advancedsetting['button']=[];
    advancedsetting['button'].push({
      "title":"設定を開く",
      "page":"setting"
    });
    return advancedsetting;
  }
  function formatLength(inputLength) {
    const length = parseFloat(inputLength);
    if (isNaN(length)) {
      return "Invalid input";
    }
    if (length >= 999 || length <= 0.0000001) {
      return "Input out of range";
    }

    if (inputLength >= 1) {
      return inputLength.toFixed(1) + "m";
    } else if (inputLength >= 0.001) {
      return (inputLength * 1000).toFixed(1) + "mm";
    } else if (inputLength >= 0.000001) {
      return (inputLength * 1000000).toFixed(1) + "um";
    } else {
      return (inputLength * 1000000000000).toFixed(1) + "pm";
    }
  }
  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings(prevState => !prevState);
    console.log(showAdvancedSettings);
  };
  function makestr(value,str_l,str_unit){
    var str_v=str_l+" = ";
    var str_add="";

    if(value===0){str_add="0 ";}
    else if(value===0.25){str_add="1/4 ";}
    else if(value===0.5){str_add="1/2 ";}
    else if(value===0.75){str_add="3/4 ";}
    else if(value===1.0){str_add=" ";}
    else if(value===1.25){str_add="5/4 ";}
    else if(value===1.5){str_add="3/2 ";}
    else if(value===1.75){str_add="7/4 ";}
    else if(value===2.0){str_add="2 ";}
    else{str_add=value+" ";}
    str_v=str_add+str_unit;
    return str_v;
  }
  useEffect(()=>{
    console.log(showAdvancedSettings);
  },[showAdvancedSettings])

    return (
    <Container>
      <ButtonDownloadWrapper>
        <ButtonDownload onClick={call_postapi}>シュミレーション実行</ButtonDownload>
      </ButtonDownloadWrapper>
      <RightBarResultBox log={log}></RightBarResultBox>
        {setting  && (
        <SettingWrapper>
          <Box object={settingbox} changepage={changepage}></Box>
          <Box object={advancedsettingbox} changepage={changepage}></Box>
        </SettingWrapper>
        )}
    </Container>
    )
  };
/**
 *       <RightBarResultBox log={log}></RightBarResultBox>
 */