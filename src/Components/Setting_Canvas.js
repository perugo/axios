import styled from "styled-components";
import React,{useState,useEffect,useRef} from "react";
const CanvasWrapper=styled.div`
  height:300px;
  width:350px;
  position:relative;
`
const CanvasInner=styled.div`
 position:absolute;
 width:100%;
 height:100%;
`
const Canvas=styled.canvas`
 position:absolute;
 width:100%;
 heigh:100%;
`
var canvas1,canvas2,canvas3;
var ctx1,ctx2,ctx3;
export const LeftBar_Canvas=({array})=> {
  const [canvas_width,setwidth]=useState(0);
  const [canvas_height,setheight]=useState(0);
  const runonce=useRef(false);

  useEffect(()=>{
    if(Object.keys(array).length==0){
      return;
    }
    var canvasInner = document.getElementById("canvasInner");
    setwidth(canvasInner.clientWidth);
    setheight(canvasInner.clientHeight);
    canvas3 = document.getElementById("canvas3");
    canvas2 = document.getElementById("canvas2");
    canvas1 = document.getElementById("canvas1");
    ctx3 = canvas3.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    ctx1 = canvas1.getContext("2d");
    ctx1.clearRect(0,0,canvas_width,canvas_height);
    ctx2.clearRect(0,0,canvas_width,canvas_height);
    ctx3.clearRect(0,0,canvas_width,canvas_height);

    if(runonce.current===true){
      draw_canvas();
    }
    runonce.current=true;    
  },[array])


  useEffect(()=>{
    if(canvas_width!=0 && canvas_height!=0){
     draw_canvas();
    } 
   },[canvas_width,canvas_height])

   function draw_canvas(){
    var lambda_len=array.lambda_field;
    var d=array.d;
    var deg=array.deg;
    var len=canvas_width*d/lambda_len;
    line(0,1,canvas_width,1,1,"black");
    line(1,0,1,canvas_height,1,"black");
    line(0,canvas_height-1,canvas_width,canvas_height-1,3,"black");
    line(canvas_width-1,0,canvas_width-1,canvas_height,3,"black");
    
    circle(canvas_width/2-len/2,canvas_height/2,4,"rgb(0,250,0)");
    circle(canvas_width/2+len/2,canvas_height/2,4,"rgb(0,250,0)");

    var space=30;
    var tip_space=3;
    line_triangle(space,tip_space,space,canvas_height-tip_space,14,lambda_len+" λ");
    line_triangle(tip_space,canvas_height-space,canvas_width-tip_space,canvas_height-space,14,lambda_len+" λ");
    
    if(len/2>=10){
      line_triangle(canvas_width/2-len/2+3,canvas_height/2,canvas_width/2+len/2-3,canvas_height/2,8,"");
    }
    ctx1.font='500 26px times new roman,serif';  
	  ctx1.fillStyle = '#404040';
	  ctx1.textBaseline = 'center';
	  ctx1.textAlign = 'center';

    var str_d=set_str(d,"d","λ");
    ctx1.fillText(str_d,canvas_width/2,canvas_height/2+40);
    var str_deg=set_str(deg,"θ","°");
    ctx1.font='500 16px times new roman,serif';  
	  ctx1.textAlign = 'right';
    ctx1.fillText("アンテナ1",canvas_width/2-len/2,canvas_height/2-20);
	  ctx1.textAlign = 'left';
    ctx1.fillText("アンテナ2",canvas_width/2+len/2,canvas_height/2-20);
    line_arrow(canvas_width/2+len/2+8,canvas_height/2,canvas_width/2+len/2+40,canvas_height/2+15,4);
    ctx1.font='500 22px times new roman,serif';  
    ctx1.fillText(str_deg,canvas_width/2+len/2+45,canvas_height/2+20);

    function circle(x,y,r,col){
      ctx2.beginPath();
      ctx2.arc(x,y, r, 0, Math.PI * 2, true);
      ctx2.fillStyle = col;
      ctx2.fill();
      ctx2.strokeStyle = 'black';
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }
    function line(x1,y1,x2,y2,w,col){
      ctx3.strokeStyle=col;
      ctx3.lineWidth=w;
      ctx3.beginPath();
      ctx3.moveTo(x1,y1);
      ctx3.lineTo(x2,y2);
      ctx3.stroke();
    }
    function set_str(value,str_l,str_unit){
      var str_v="";
      if(value==0){str_v+="0";}
      else if(value==0.25){str_v+="1/4 ";}
      else if(value==0.5){str_v+="1/2 ";}
      else if(value==0.75){str_v+="3/4 ";}
      else if(value==1.0){str_v+="1 ";}
      else if(value==1.25){str_v+="5/4 ";}
      else if(value==1.5){str_v+="3/2 ";}
      else if(value==1.75){str_v+="7/4 ";}
      else if(value==2.0){str_v+="2 ";}
      else{str_v=value+" "}
      return str_l+" = "+str_v+str_unit;
      
    }
    function line_arrow(x1,y1,x2,y2,s){
      ctx1.strokeStyle='black';
      ctx1.lineWidth=0.5;
      ctx1.beginPath();
      ctx1.moveTo(x1,y1);
      ctx1.lineTo(x2,y2);
      ctx1.stroke();

      var rot=Math.asin((y2-y1)/(x2-x1))/Math.PI;
      triangle(x1,y1,4,rot);
      function triangle(x,y,s,rot){
        var vector=1/7;
        ctx1.beginPath();
        ctx1.moveTo(x,y);
        var cos_x=Math.cos(rot*Math.PI+Math.PI*vector);
        var sin_y=Math.sin(rot*Math.PI+Math.PI*vector);
        ctx1.lineTo(x+s*cos_x,y+s*sin_y);
        cos_x=Math.cos(rot*Math.PI-Math.PI*vector);
        sin_y=Math.sin(rot*Math.PI-Math.PI*vector);
        ctx1.lineTo(x+s*cos_x,y+s*sin_y);
        ctx1.closePath();
        ctx1.strokeStyle = "rgb(0,0,0)"; //枠線の色
        ctx1.stroke();
        ctx1.fillStyle="rgb(0,0,0)";//塗りつぶしの色
        ctx1.fill();
      }
    }
    function line_triangle(x1,y1,x2,y2,s,str_sentence){
      var muki=true;
      if(x1===x2){muki=true;}else{muki=false;}
      ctx1.strokeStyle='black';
      ctx1.lineWidth=1;
      ctx1.beginPath();
      ctx1.moveTo(x1,y1);
      ctx1.lineTo(x2,y2);
      ctx1.stroke();
      if(str_sentence!=""){
        sentence(x1,y1,x2,y2,str_sentence);
      }
      if(muki==true){
        triangle(x1,y1+2,s,0.5);
        triangle(x2,y2-2,s,1.5);
      }else{
        triangle(x1,y1,s,0);
        triangle(x2,y2,s,1);
      }
      function triangle(x,y,s,rot){
        var vector=1/7;
        ctx1.beginPath();
        ctx1.moveTo(x,y);
        var cos_x=Math.cos(rot*Math.PI+Math.PI*vector);
        var sin_y=Math.sin(rot*Math.PI+Math.PI*vector);
        ctx1.lineTo(x+s*cos_x,y+s*sin_y);
        cos_x=Math.cos(rot*Math.PI-Math.PI*vector);
        sin_y=Math.sin(rot*Math.PI-Math.PI*vector);
        ctx1.lineTo(x+s*cos_x,y+s*sin_y);
        ctx1.closePath();
        ctx1.strokeStyle = "rgb(0,0,0)"; //枠線の色
        ctx1.stroke();
        ctx1.fillStyle="rgb(0,0,0)";//塗りつぶしの色
        ctx1.fill();
      }
      function sentence(x1,y1,x2,y2){
        var muki=true;
        if(x1===x2){muki=true;}else{muki=false;}

        if(muki===true){
          ctx1.fillStyle="rgb(255,255,255)";
          ctx1.fillRect(10,y1+80,80,40);
          ctx1.font='500 22px times new roman,serif';  
	        ctx1.fillStyle = '#404040';
	        ctx1.textBaseline = 'center';
	        ctx1.textAlign = 'center';
          ctx1.fillText(str_sentence,x1,y1+110);
        }else{
          ctx1.fillStyle="rgb(255,255,255)";
          ctx1.fillRect(x1+140,canvas_height-60,90,50);
          ctx1.font='500 22px times new roman,serif';  
	        ctx1.fillStyle = '#404040';
	        ctx1.textBaseline = 'center';
	        ctx1.textAlign = 'center';
          ctx1.fillText(str_sentence,x1+180,y1+10);
        }
      }
    }

  }
    return (
    <div>
      <CanvasWrapper>
        <CanvasInner id="canvasInner">
          <Canvas id="canvas3" width={canvas_width} height={canvas_height}/>
          <Canvas id="canvas2" width={canvas_width} height={canvas_height}/>
          <Canvas id="canvas1" width={canvas_width} height={canvas_height}/>
        </CanvasInner>
      </CanvasWrapper>
    </div>
    )
  };
  