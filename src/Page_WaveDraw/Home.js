import styled from "styled-components";
import { useState, useEffect, useRef } from 'react';
import { Home as Setting_Medium } from './SettingPage_Medium/Home';
import { Home as Setting_All } from './SettingPage_Basic/Home';
import { DrawCanvas } from './DrawCanvas';
import { Link } from './../Components/Link';
import axios from 'axios';

const Body = styled.div`
  display:flex;
  flex-direction:row;
  background-color:rgb(255,255,255);
  height:100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background: white;
  border: 1px solid #ccc;
  cursor:pointer;
`;

const SimulationWrapper = styled.div`
width:400px;
`
const Canvas = styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:1.0;
`
const Container = styled.div`
  margin-bottom:10px;
  margin-left:10px;
  position:relative;
  display: inline-block;
  display:flex;
  flex-direction:column;
  visibility: ${props => props.show === "home" ? 'visible' : 'hidden'};
  opacity: ${props => props.show === "home" ? 1 : 0};
`
const Setting_Wrapper = styled.div`
  position:relative;
  margin-left:auto;
  margin-right:auto;
  background-color:pink;
  width:300px;
  min-width:300px;

`
const Layout_Wrapper = styled.div`

`
const Setting_Inner = styled.div`
`
const Radio_Wrapper = styled.div`
  margin:top:10px;
  margin-left:10px;
  margin-right:10px;
`

const Setting_Info = styled.div`
  margin-left:10px;
  margin-right:10px;  
`

const Setting_setbut = styled.div`
  positoin:flex;
  display:flex;
  display:row;
`

const Setting_result = styled.div`
  margin-left:10px;
  margin-right:10px;
`
const SettingBar = styled.div`
  width:200px;
  height:400px;
  background-color:rgb(240,240,240);
  position:relative;
`

const ButtonDownloadWrapper = styled.div`
margin-top:30px;
margin-bottom:15px;
text-align: center
`
const ButtonDownload = styled.div`
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
&:active{
  background-color:#EB5F07;
}
`
const SettingWrapper = styled.div`
position:absolute;
top:0;
left:0;
display: inline-block;
display:flex;
flex-direction:column;
visibility: ${props => props.show === "settingMedium" ? 'visible' : 'hidden'};
  opacity: ${props => props.show === "settingMedium" ? 1 : 0};
`
const AllSettingWrapper = styled.div`
position:absolute;
top:0;
left:0;
display: inline-block;
display:flex;
flex-direction:column;
visibility: ${props => props.show === "settingAll" ? 'visible' : 'hidden'};
  opacity: ${props => props.show === "settingAll" ? 1 : 0};
`
const MEDIUM_COLOR = ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(0,0,200)', 'rgb(0,255,0)', 'rgb(255,180,0)'];
const BREADHOME = [{ title: "ホーム" }, { title: "FDTDシュミレーション", link: "home" }];
const BREADMEDIUMSETTING = [{ title: "ホーム" }, { title: "FDTDシュミレーション", link: "home" }, { title: "媒質の変更", link: "settingMedium" }];
const BREADALLSETTING = [{ title: "ホーム" }, { title: "FDTDシュミレーション", link: "home" }, { title: "設定", link: "settingAll" }];
export const Home = () => {
  const [array, setArray] = useState({});
  const readOnce = useRef(true);
  const [mediumArray, setMediumArray] = useState([]);
  const [disp, setdisp] = useState([]);
  const [showwindow, setShowWindow] = useState("home");
  const [bitmap, setBitmap] = useState([]);
  const [source, setSource] = useState({ x: 0, y: 0 });
  const [data, setData] = useState({});

  useEffect(() => {
    if (readOnce.current == false) {
      console.log("App.js rejected");
      return;
    }
    const initial = [];
    initial.push({
      "DielectricConstant": "1",
      "DielectricLoss": "0",
      "MagneticConstant": "1",
      "MagneticLoss": "0",
    });

    initial.push({
      "DielectricConstant": "1",
      "DielectricLoss": "10000000000",
      "MagneticConstant": "1",
      "MagneticLoss": "0"
    });
    setMediumArray(initial);
    readOnce.current = false;
    console.log("reading app useEffect");
    var default_array = {
      fieldX: 48,
      fieldY: 36,
      split: 200,
      lambda: 4,
    };

    setTimeout(function () {
      setArray(default_array);
      setData({ bitmap: [], array: default_array, source: { x: 0, y: 0 } });
    }, 100);
  }, [])

  function changepage(string) {
    setShowWindow(string);
  }
  function funcShowWindow() {
    setShowWindow("home");
  }
  function changeMedium(newMedium) {
    if (mediumArray.length >= 2) {
      const firstTwo = mediumArray.slice(0, 2);
      setMediumArray([...firstTwo, ...newMedium]);
    } else {
    }
  }

  function changeData(newData) {
    setArray(newData.array);
    setSource(newData.source);
    setBitmap(newData.bitmap);
    setData({ bitmap: newData.bitmap, array: newData.array, source: newData.source });
  }
  const makejsontext = async () => {
    try {
      let dx = array.fieldX / array.split;
      let ynum = Math.ceil(array.fieldY / dx);
      const convertedMedium = mediumArray.map(item => {
        let convertedItem = {};
        for (let key in item) {
            convertedItem[key] = parseFloat(item[key]);
        }
        return convertedItem;
    });
      let obj = { bitmap: bitmap, array: { xnum: array.split, ynum: ynum, dx: dx, lambda: array.lambda }, source: source,medium:convertedMedium };
      const response = await axios.post('http://localhost:5000/register', obj);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving data', error);
    }
  }
  return (
    <div className="App">
      <Container show={showwindow}>
        <Link changepage={changepage} linkobject={BREADHOME}>
        </Link>
        <Body>
          <DrawCanvas data={data} setBitmap={setBitmap} setSource={setSource} mediumArray={mediumArray}></DrawCanvas>
          <SettingBar>
            <ButtonDownloadWrapper>
              <ButtonDownload onClick={() => setShowWindow("settingMedium")}>媒質を変更
              </ButtonDownload>
            </ButtonDownloadWrapper>
            <ButtonDownloadWrapper>
              <ButtonDownload onClick={() => setShowWindow("settingAll")}>設定
              </ButtonDownload>
            </ButtonDownloadWrapper>
            <ButtonDownloadWrapper>
              <ButtonDownload onClick={() => makejsontext()}>json作成
              </ButtonDownload>
            </ButtonDownloadWrapper>
          </SettingBar>
        </Body>
      </Container>
      <SettingWrapper show={showwindow}>
        <Link changepage={changepage} linkobject={BREADMEDIUMSETTING}>
        </Link>
        <Body>
          <Setting_Medium bitmap={bitmap} set_bitmap={setBitmap} mediumColor={MEDIUM_COLOR} mediumArray={mediumArray} changeMedium={changeMedium} funcShowWindow={funcShowWindow}></Setting_Medium>
        </Body>
      </SettingWrapper>
      {showwindow === "settingAll" && (
        <AllSettingWrapper show={showwindow}>
          <Link changepage={changepage} linkobject={BREADALLSETTING}>
          </Link>
          <Body>
            <Setting_All changeData={changeData} bitmap={bitmap} array={array} source={source} funcShowWindow={funcShowWindow}></Setting_All>
          </Body>
        </AllSettingWrapper>
      )}
    </div>
  )
};
