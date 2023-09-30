import styled from "styled-components";
import {LeftBar} from './Components/LeftBar';
import {RightBar} from './Components/RightBar';
import { Link } from './../Components/Link';
import  Loading_Effect  from './../Components/Loading_Effect';
import React,{useState,useEffect,useRef} from 'react';
import {Home as Setting_Basic} from './SettingPage_Basic/Home';
import {gql ,useLazyQuery,useMutation} from '@apollo/client';
import {Home as Setting_Detail} from './SettingPage_Detail/Home';
const GET_DATA = gql`mutation MyMutation($input: MyInput!) {createData(input: $input){url}}`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  background-color:rgb(255,255,255);
  height:100%;
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
const BREADHOME=[{title:"ホーム"},{title:"二素子アレーアンテナの物理現象",link:"home"}];
const BREADSETTING=[{title:"ホーム"},{title:"二素子アレーアンテナの物理現象",link:"home"},{title:"設定",link:"setting"}];
const BREADSETTINGDETAIL=[{title:"ホーム"},{title:"二素子アレーアンテナの物理現象",link:"home"},{title:"詳細設定",link:"setting_detail"}];
export const Home=()=> {
  const readOnce=useRef(true);
  var [setting,setsetting]=useState({});
  const [default_setting_array,setdefault_setting_array]=useState([]);
  const [log,setlog]=useState(null);
  const [showwindow,setshowwindow]=useState("home");
  const [Pending,setPending]=useState(false);
  const [data,setData]=useState(null);
  const [getNote, { loading, error, data: fetchedData }] = useMutation(GET_DATA, {
    context: { clientName: 'homeApi1' }  // This context determines which client to use
  });
  const push = () => {
    if(!Pending){
    setPending(true);
    setTimeout(() => {
      setPending(false);
    }, 17000);

      const inputObj = {
        type: "ale-antena",
        simulation_array: {
          lambda_field: setting.lambda_field,
          d: setting.d,
          deg: setting.deg,
          lambda: setting.lambda,
          dx: setting.dx
        }
      };
      getNote({
        variables: { input: inputObj }
      });
  }
  };
  useEffect(() => {
      if (!loading && fetchedData) {
        setData(fetchedData.getNote);
      }
    }, [loading, fetchedData]);

  var default_setting_object=[
    {
      lambda_field:8,
      d:0.5,
      deg:0,
      lambda:0.003,
      dx:12,
      display:"d =λ/2, θ =0°"
    },
    {
      lambda_field:8,
      d:0.5,
      deg:180,
      lambda:0.003,
      dx:12,
      display:"d =λ/2, θ =180°"
    },
    {
      lambda_field:8,
      d:0.25,
      deg:90,
      lambda:0.003,
      dx:12,
      display:"d =λ/4, θ =90°"
    }
  ]
  var default_array={
    lambda_field:8,
      d:0.5,
      deg:0,
      lambda:0.003,
      dx:12,
  }
  useEffect(()=>{
    if(readOnce.current===false){
      return;
    }
    readOnce.current=false;
    var default_log={
      "success":true,
      "array":[
        {
          "title":"デフォルト設定１です"
        }
      ]
    };
    setlog(default_log);
    setsetting(default_array);
    setdefault_setting_array(default_setting_object);
  },[])

  /*
  change_array はデフォルト設定からの変更
  */
  function change_array(input_array){
    var arr=determine(input_array)
    setlog(arr);
    setsetting(input_array);
  }

  /*
  change_from_leftは右側からの変更
  */
  function change_from_left(input_array){
    var arr=determine(input_array)
    setlog(arr);
    setsetting(input_array);
  }
  
  
  function changepage(string){
    setshowwindow(string);
  }
  function determine(input_array){
    var index=-1;
    for (var i = 0; i < default_setting_object.length; i++) {
      var match = true;
      var defaultObj = default_setting_object[i];
      if (
        defaultObj.lambda_field !== input_array['lambda_field'] ||
        defaultObj.d !== input_array['d'] ||
        defaultObj.deg !== input_array['deg'] ||
        defaultObj.lambda !== input_array['lambda']
      ) {
        match = false;
      }
      if (match) {
        index=i;
        break;
      }
    }

    if(index>=0){
      var str=zenkaku2Hankaku(index+1);
      var ss_log={};
      ss_log['success']=true;
      ss_log['array']=[];
      ss_log['array'].push({
        "title": "デフォルト設定"+str+"です"
      });
      return ss_log;
    }else{
      var ss_log={};
      ss_log['success']=true;
      ss_log['array']=[];
      ss_log['array'].push({
        "title": "独自の設定です"
      });
      return ss_log;
    }
    function zenkaku2Hankaku(int) {
      var str=int.toString();
      return str.replace(/[0-9]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
    }  
  }
  const call_postapi=()=>{
    setPending(true);
  }
  useEffect(()=>{
  },[log])
  useEffect(()=>{
  },[showwindow])

  useEffect(() => {
    if (!loading && fetchedData) {
      setTimeout(() => {
        window.open(fetchedData.createData.url, '_blank');
      }, 2000);
    }
  }, [loading, fetchedData]);
    return (
      <div>
        {showwindow==="home" &&(
          <Wrapper>
            <Link changepage={changepage} linkobject={BREADHOME}>
            </Link>
            <Container>
              <LeftBar setting={setting} change_array={change_array} default_setting_array={default_setting_array}></LeftBar>
              <RightBar setting={setting} log={log} changepage={changepage} push={push}></RightBar>
            </Container>
          {Pending == true && (
            <Loading_Effect></Loading_Effect>
          )}
        </Wrapper>
        )}
         {showwindow==="setting" &&(
          <Wrapper>
            <Link changepage={changepage} linkobject={BREADSETTING}>
            </Link>
            <Setting_Basic setting={setting} change_from_left={change_from_left} changepage={changepage}></Setting_Basic>
          </Wrapper>
        )}
        {showwindow==="setting_detail" &&(
          <Wrapper>
            <Link changepage={changepage} linkobject={BREADSETTINGDETAIL}>
            </Link>
            <Setting_Detail setting={setting} change_from_left={change_from_left} changepage={changepage}></Setting_Detail>
          </Wrapper>
        )}
      </div>
    )
}


/*
function left_error_detector(input){
    var errors = [];
  // Rule 1: Check if variables are declared and are all numbers
  var variables = ["d", "lambda", "fai", "lambda_field"];
  for (var i = 0; i < variables.length; i++) {
    var variable = variables[i];
    if (!(variable in input) || typeof input[variable] !== "number") {
      errors.push("Variable '" + variable + "' should be declared and be a number.");
    }
  }

  // Rule 2: Check if d is smaller than lambda_field and not 0
  if (input.d >= input.lambda_field || input.d === 0) {
    errors.push("Invalid value for 'd'. It should be smaller than 'lambda_field' and not 0.");
  }

  // Rule 3: Check if lambda is not 0
  if (input.lambda === 0) {
    errors.push("Invalid value for 'lambda'. It should not be 0.");
  }

  // Rule 4: Check if fai is within the valid range
  if (!Number.isInteger(input.fai) || input.fai < 0 || input.fai > 359) {
    errors.push("Invalid value for 'fai'. It should be an integer between 0 and 359.");
  }

  // Rule 5: Check if lambda_field is within the valid range
  if (!Number.isInteger(input.lambda_field) || input.lambda_field <= 3 || input.lambda_field >= 12) {
    errors.push("Invalid value for 'lambda_field'. It should be an integer bigger than 3 and smaller than 7.");
  }

  // Return true if no errors, otherwise return the error logs
  if (errors.length === 0) {
    return true;
  } else {
    return errors;
  }
  }
*/


/*

*/