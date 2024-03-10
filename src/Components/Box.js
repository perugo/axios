import styled from "styled-components";
import React,{useState,useEffect} from 'react';

const MainContentWrapper=styled.div`
  padding-left:10px;
  padding-right:10px;
`
const MainContentInner=styled.div`
padding-top:16px;
padding-bottom:20px;
`
const Content=styled.div`
row-gap:20px;
flex-direction:column;
display:flex;
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
 cursor: ${props =>(props.show ? 'inherit' : 'pointer')};

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
padding:20px 20px 10px 20px;
`
const FrontBodyInner=styled.div`
position:relative;
  cursor:pointer;
  display:flex;
  padding: 12px 20px 12px 20px;
  border:none;
  line-height:22px;
  text-align:left;
  background-color:#ddd;
`

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


const SVGInner=styled.div`
  position:relative;
  width:20px;
  height:20px;
  margin:auto;
  stroke:"rgb(40,40,40)";
  stroke-width:8px;
  stroke-linejoin:round;
  transform: ${props =>(props.showAdvancedSettings ? 'rotate(0)' : 'rotate(270deg)')};
`
const SVGWrapper=styled.div`
  display:flex
  height:35px;
  width:30px;
  margin-top:3px;
  margin-bottom:3px;
  margin-left:-8px;
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
const TextM=styled.div`
  line-height:1.2;
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 1.2em;
`
const SpanText=styled.span`
font-size:15px;
font-weight:500;
line-height:24px;
color:rgb(40,40,40);
margin-bottom:2px;
`
const ButtonWrapper=styled.div`
`
const Button=styled.button`
background-color:rgb(255,255,255);
border-color:rgb(150,150,150);
border-style:solid;
border-width:1px;
border-radius:3px;
padding:4px 15px;
&:hover {
  border-color:rgb(100,100,100);
  background-color:rgb(240,240,240);
}
`
const FrontHeaderLeft=styled.div`
line-height:none;
display:flex;
flex-direction:row;
`
export const Box=({object,changepage})=> {
    const [obj,setobj]=useState('');
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

    useEffect(()=>{
        if(object === null || Object.keys(object).length===0){
            return;
          }
        setobj(object);
    },[object])
    const toggleAdvancedSettings = () => {
      setShowAdvancedSettings(prevState => !prevState);
    };
    function call_changepage(object){
      changepage(object.t.page);
    }
    return (
    <div>
    {obj && (

      <MainContentWrapper>

        <MainContentInner>
          <Content>
            <Front>
              <FrontWrapper>
                <FrontHeader>

                    {obj && (
                      <div>
                    <FrontHeaderInner show={obj.show} onClick={toggleAdvancedSettings}>
                        <FrontHeaderLeft>
                          {!obj.show &&(
                          <SVGWrapper>
                            <SVGInner showAdvancedSettings={showAdvancedSettings}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path fill="bl" stroke="black" strokeWidth="2" width="100%" height="100%" d="M4 5h8l-4 6-4-6z"></path> </svg>
                            
                            </SVGInner>
                          </SVGWrapper>
                          )}
                          <TitleWrapper>
                            <TitleInner>
                              <CustomH3 style={{margin:0}}>{obj.title}</CustomH3>
                            </TitleInner>
                          </TitleWrapper>
                        </FrontHeaderLeft>
                        <div style={{display:"block"}}>
                        {obj && (obj.button.map(( t , index ) => (
                          <div style={{padding:"1px"}}>
                          <Button onClick={()=>call_changepage({t})}><SpanText>{t.title}</SpanText></Button>
                          </div>
                        )))}
                        </div>
                    </FrontHeaderInner>

                    
                    </div>
                    )}
                </FrontHeader>

        {(obj.show  || showAdvancedSettings===true) &&(
        <FrontBody>
            <ColumnLayout>

            {obj && (obj.array.map((element, index) => (
        <div key={index}>
            <GridColumn>
                <ColumnTitle style={{fontFamily:"serif"}}>
                {element.title}
                </ColumnTitle>
                {element.value}
                {element.vaarergg}
            </GridColumn>

        <div style={{paddingBottom:"10px"}}></div>
        </div>
        )))}
            </ColumnLayout>        
        </FrontBody>
        )}
              </FrontWrapper>
            </Front>
          </Content>
        </MainContentInner>
      </MainContentWrapper>
    )}
      </div>
    )
  };
  