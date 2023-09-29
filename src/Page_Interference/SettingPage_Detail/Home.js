import styled from "styled-components";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import React,{useState,useEffect,useRef} from 'react';
import './../Components/SliderOverride.css';
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

const ColumnLayout=styled.div`
  margin:-10px;
  display:flex;
  flex-wrap:wrap;
  color::#16191f;
  box-sizing:border-box;
  border-collapse:separete;
  direction:1tr;
  flex-direction:column;


  cursor:auto;
  direction:1tr;
  text-align:left;
  font-size:18px;
  line-height:20px;
  color:#16191f;
  font-weight:500;
  font-family:times new roman,serif;
`
const GridColumn=styled.div`
  padding:10px 10px 0px 10px;
  box-sizing:border-box;
  display:flex;
  position:relative;
  flex-direction:column;
`
const ColumnTitle=styled.div`
  font-size:18px;
  font-weight:500;
  line-height:24px;
  color:#545b64;
  margin-bottom:2px;
  font-family:times new roman,serif;
`

export const Home=({setting,change_from_left,changepage})=> {
  const [lambda,setlambda]=useState(0);
  const [displambda,setdisplambda]=useState("");
  const [labellambda,setlabellambda]=useState("");
  const [array,setarray]=useState({});
  const timeoutIdRef = useRef();

  const handleChange_lambda = (event) => {
    var v=event.target.value;
    setdisplambda(v);
    var number_boolean=isValidNumber(v);
    if(number_boolean===true){
        setlabellambda(convertToUnits(parseFloat(v)));
        setlambda(parseFloat(v));
    }else{
      setlabellambda(number_boolean);
      console.log("iiiii");
    }
  };
  const startTimer = () => {
    timeoutIdRef.current = setTimeout(handleTimeout, 600);
  };
  const call_change_from_left=()=>{
    var o={};
    o['lambda_field']=setting['lambda_field'];
    o['d']=setting['d'];
    o['deg']=setting['deg'];
    o['lambda']=lambda;
    o['dx']=setting['dx'];
    change_from_left(o);
    changepage('home');
  }
  const handleTimeout = () => {
    var o={};
    o['lambda_field']=setting['lambda_field'];
    o['d']=setting['d'];
    o['deg']=setting['deg'];
    o['lambda']=setting['lambda'];
    o['dx']=setting['dx'];
    setarray(o);
  };
  useEffect(() => {
    if(setting!==null){
      setdisplambda(setting.lambda)
      setlambda(setting.lambda)
      setarray(setting);
      var number_boolean=isValidNumber(setting.lambda);
      if(number_boolean){
        setlabellambda(convertToUnits(parseFloat(setting.lambda)));
      }else{
        setlabellambda("not a number!!!")
      }
    }
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [setting]);
  useEffect(()=>{
    clearTimeout(timeoutIdRef.current);
    startTimer();
  },[lambda])

  function convertToUnits(value) {
    if (value === 0) {
      return '0m';
    }
    if(value>=1000){
      return "値が大きすぎます"
    }
    if (value >= 1) {
      return value + 'm';
    }
    if (value >= 0.001) {
      return (value * 1000) + 'mm';
    }
    if (value >= 0.000001) {
      return (value * 1000000) + 'um';
    }
    return "値が小さすぎます";
  }
  
  function isValidNumber(input) {
    let str = String(input);  // Convert the input to a string
    if (!str.length) {
      return "未入力です";
    }
    // Check for any character that's not 0-9 or .
    if (/[^0-9.]/.test(str)) {
        return "数字と.以外入力禁止です";
    }
    // Check for more than one period
    if ((str.match(/\./g) || []).length > 1) {
        return ".が二つ以上あります";
    }
    // Check for strings starting with "0" but are not just "0" or a decimal like "0.xxxx"
    if (str.startsWith('0') && str.length > 1 && str[1] !== '.') {
        return "例)001は無効です";
    }
    // Check if string ends with a period or with a 0 after a period (indicating trailing zeros after a decimal point)
    if (str.endsWith('.') || /0+$/.test(str.split('.')[1] || '')) {
        return "小数点以下の0で終了する値は無効です";
    }
    
    var cleanedStr = str.replace(/^0+|\./g, '');
cleanedStr = cleanedStr.replace(/^0+/, '');  // Remove leading zeros again

    let digitCount = cleanedStr.length;
    if (digitCount >= 6) {
      return "有効桁数は６桁までです";
    }
    var v=parseFloat(str);
    if(v>=1000){
      return "値が大きすぎます";
    }
    if (v < 0.000001) {
      return "値が小さすぎます";
    }
      //console.log(isValidNumber("afee"));    // false
      //console.log(isValidNumber("0.0000"));  // false
      //console.log(isValidNumber("3dc"));     // false
      //console.log(isValidNumber("2334."));   // false
      //console.log(isValidNumber("33.45"));   // true
      //console.log(isValidNumber("333"));     // true
      //console.log(isValidNumber("001.23"));  // false
    return true;
  }

    return (
    <MainContentWrapper>

      <MainContentInner>
        <Container>
          <LeftSide>
            <Antenna_Canvas setting={array}></Antenna_Canvas>
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
                            <CustomH3 style={{margin:0}}>アンテナ間の距離の設定</CustomH3>
                          </TitleInner>
                        </TitleWrapper>
                      </FrontHeaderLeft>
                    </FrontHeaderInner>
                  </FrontHeader>
                  <FrontBody>
                  <ColumnLayout>
<GridColumn>
    <ColumnTitle style={{fontFamily:"serif"}}>
波長[λ]
    </ColumnTitle>
    <div style={{paddingTop:"10px"}}>　</div>
                      <input style={{fontSize:"18px"}}
                        type="text"
                        value={displambda}
                        onChange={handleChange_lambda}
                        pattern="[0-9,]*"
                      />
                    <div>波長 :  {labellambda} </div>

</GridColumn>

<div style={{paddingBottom:"10px"}}></div>

</ColumnLayout>      



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
  