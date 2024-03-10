import styled from "styled-components";
import React,{useEffect} from 'react';
import { Antenna_Canvas } from "./Antenna_Canvas";
const Container=styled.div`
  margin-bottom:5px;
  margin-left:30px;
  margin-top:15px;
  margin-right:5px;
  width:500px;
`
const TextNumber=styled.span`
  font:100% times new roman,serif;
  line-height:1.4;
  font-size:1.6em;
  color:#3333ef;
  &:hover { color: orange; }
  text-align:center;

`
const Text=styled.span`
font:100% times new roman,serif;
  font-size:1.1em;
  text-align:center;
`
const TextM=styled.div`
  line-height:1.2;
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 1.2em;
`

const DefaultSettingWrapper=styled.div`
  width:400px;
`
const DefaultText=styled.div`
  text-align:center;
  padding: 10px 0px 10px 0px;
`
const SpanDefaulttext=styled.span`
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 1.6em;
`
const DefaultOption=styled.div`
`
const OptionElement=styled.div`
text-align:center;
`
const UnitElement=styled.div`
padding-top:10px;
text-align:center;
`
const UnitDefinition=styled.div`
height:40px;
`

export const LeftBar=({setting,change_array,default_setting_array})=> {
  useEffect(()=>{
  },[setting,default_setting_array])
  
  const con=(index)=>()=>{
    var element=default_setting_array[index];
    var o={};
    o['lambda_field']=element['lambda_field'];
    o['d']=element['d'];
    o['deg']=element['deg'];
    o['lambda']=element['lambda'];
    o['dx']=element['dx'];
    change_array(o);
  }
    return (
    <Container>
      <Antenna_Canvas setting={setting}></Antenna_Canvas>
      <DefaultSettingWrapper>
        <DefaultText>
          <SpanDefaulttext>デフォルト設定</SpanDefaulttext>
        </DefaultText>
        <DefaultOption>
        {default_setting_array && (default_setting_array.map((element, index) => (
        <div key={index}>
        <OptionElement onClick={con(index)}><TextNumber>{element.display}</TextNumber></OptionElement>
        </div>
        )))}
        </DefaultOption>
        <UnitDefinition>
          <UnitElement><Text>d : アンテナ間の距離　θ : アンテナ間の位相差[deg]</Text></UnitElement>
        </UnitDefinition>
      </DefaultSettingWrapper>
    </Container>
    )
  };
  