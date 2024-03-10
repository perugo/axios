import styled from "styled-components";
import React, { useState, useEffect } from 'react';
const UIWrapper = styled.div`
 padding-left:40px;
 padding-right:40px;
width:fit-content;

`
const UIBreadCrumbs = styled.div`
  padding-top:4px;
  padding-bottom:2px;
  width:100%;
  color:#16191f;
`
const UIRoot = styled.div`
  float:left;
  font-size:18px;
  line-height:28px;
  color:#16191f;
  font-weight:400;
  font-family:Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  -webkit-font-smoothing:auto;
  margin:0;
  padding:4px 0;
`
const ListBreadCrumbs = styled.div`
display:flex;
align-items:center;
padding:0;
margin:0;
width:100%;
flex-wrap:wrap;
flex-direction:row;
`
const BreadCrumbsItem = styled.li`
display:inline-block;
padding:0;
margin:0;
text-align:left;
`
const ItemContainer = styled.div`
display:flex;
flex-direction:row;
`
const ItemLabel = styled.a`
color:#0073bb;
font-weight:inherit;
text-decoration-color:transparent;
text-decoration:none;
cursor:pointer;
line-height:inherit;
display:flex;
align-items:center;
display : inline-block;
&:hover{
  text-decoration:underline;
}
`
const Textlb = styled.span`
line-height:inherit;
font-size:18px;
`
const ItemAnchor = styled.span`
  margin:0 8px;
  color:#687078;
  box-sizing:border-box;
`
const AnchorInner = styled.span`
  height:28px;
  padding 3px 0px;
  width:16px;
  box-sizing:border-box;
  position:relative;
  display:inline-block;
  stroke-width:2px;
  pointer-events:none;
  position:relative;
  
`
export const Link = ({ linkobject, changepage }) => {
  const [value, setvalue] = useState([])
  useEffect(() => {
    if (linkobject !== null && linkobject.length !== 0) {
      var o = makeobject(linkobject);
      setvalue(o);
    }
  }, [linkobject])

  function makeobject(objbreadcrumbs) {
    var outputObject = [];

    // Add the input object's array items
    objbreadcrumbs.forEach(function (item, index) {
      outputObject.push({
        link: item.link,
        title: item.title,
        show: index !== objbreadcrumbs.length - 1
      });
    });
    return outputObject;
  }

  function call_changepage(i) {
    var index = i.index;
    if (index === 0) {
      window.location.href = "http://localhost:3000";
    } else {
      changepage(linkobject[i.index].link);
    }
  }
  useEffect(() => {
  }, [value])
  return (
    <UIWrapper>
      <UIBreadCrumbs>
        <UIRoot>
          <ListBreadCrumbs>
            {value && (value.map((element, index) => (
              <div key={index}>
                <BreadCrumbsItem>
                  <ItemContainer>
                    <ItemLabel>
                      <Textlb><span onClick={() => call_changepage({ index })}>{element.title}</span></Textlb>
                    </ItemLabel>
                    {element.show && (
                      <ItemAnchor>
                        <AnchorInner>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m4 1 7 7-7 7" stroke="rgb(60,60,60)" strokeWidth="2.0px" fill="none" /></svg>
                        </AnchorInner>
                      </ItemAnchor>
                    )}
                  </ItemContainer>
                </BreadCrumbsItem>
              </div>
            )))}
          </ListBreadCrumbs>
        </UIRoot>
      </UIBreadCrumbs>

    </UIWrapper>
  )
};
