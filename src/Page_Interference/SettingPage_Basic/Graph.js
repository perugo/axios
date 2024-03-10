import React, { useEffect, useState,useRef } from 'react';
import functionPlot from "function-plot";
import './../Components/SliderOverride.css';
function Graph({graphdeg}) {
    const graphRef = useRef(null);
  useEffect(() => {
    const options = {
      target: graphRef.current,
      width: 500,
      height: 300,
      disableZoom: true, // Disable zooming
      disablePan: true, // Disable panning
      xAxis: {
        label: 'シュミレーション回数',
        domain:[0,150],
        labelStyle: {
          fontSize: '25px' // Adjust the font size as needed
        }
      },
      yAxis: {
        label: '入力波',
        domain:[-1.2,1.2],
        labelStyle: {
          fontSize: '25px' // Adjust the font size as needed
        }
      },
      data: [
        {
          fn: `y=sin(2*3.141*(10^10*0.71*10^-11*x+(${graphdeg}/360)))*1/(1+2.715^(-0.10(x-40)))`,
          graphType: 'scatter',
          color:"rgba(0,0,255,0.6)",
        lineWidth: 3, // Set the line width to 3 pixels
        skipTip:true
        },
        {
          fn: 'y=sin(2*3.141*10^10*0.71*10^-11*x)*1/(1+2.715^(-0.10(x-40)))',
          graphType: 'scatter',
          skipTip:true,
          color:"red",
          lineWidth: 3, // Set the line width to 3 pixels
        }
      ],
    };
    functionPlot(options);
  }, [graphdeg]);
  return (
    <div>
      <div style={{width:"500px"}}ref={graphRef}></div>
    </div>
  );
}

export default Graph;


//                r = (int)(255.0 - 255.0 / (1 + Math.Pow(Math.E, -0.15 * ((double)i - 30.0))));
//            fn: (scope) =>Math.sin(scope.x+2*3.14*(0/360))*1.0/(1+Math.pow(Math.e,(-0.12*(scope.x-30.0)))),
