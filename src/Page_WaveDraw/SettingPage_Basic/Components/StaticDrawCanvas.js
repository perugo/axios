import styled from "styled-components";
import { useRef, useState, useEffect } from 'react';
import { React } from 'react';

const Canvas = styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:1.0;
`

const Container = styled.div`
  position:relative;
  height:fit-content;
  width:fit-content;
`

const Layout_Wrapper = styled.div`
`
var xnum;
var ynum;
var canvasDx;
var canvasDy;
var fieldX;
var fieldY;
var lambda;
var sourceX;
var sourceY;
var bitmap;
const MEDIUM_COLOR = ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(0,0,200)', 'rgb(0,255,0)', 'rgb(255,180,0)'];
export const StaticDrawCanvas = ({originalData,array}) => {
    var [width, setwidth] = useState('');
    var [height, setheight] = useState('');
    const canvas1Ref = useRef();
    const canvas2Ref = useRef();
    const canvas3Ref = useRef();
    const canvas4Ref = useRef();
    const [configReady, setconfigReady] = useState(0);

    useEffect(() => {
        if(!originalData || !array)return;
        xnum=array.split;
        fieldX=array.fieldX;
        lambda=array.lambda;
        let dx=array.fieldX / array.split;
        xnum = array.split;
        ynum = Math.ceil(array.fieldY / dx);
        fieldY=ynum * dx;

        var H_height1 = window.innerHeight * 0.45;
        var H_height2 = window.innerHeight * 0.5 - 60;
        var S_width1 = 400;
        var S_width2 = window.innerWidth * 0.4;
        var H_width = (S_width1 < S_width2) ? S_width1 : S_width2;
        var H_height = (H_height1 < H_height2) ? H_height1 : H_height2;
        var bai = 1;
        while (H_height > bai * ynum && H_width > bai * array.split) {
            bai += 0.1;
        }
        canvasDx = bai;
        canvasDy = bai;
        setwidth((canvasDx * array.split).toString());
        setheight((canvasDy * ynum).toString());
        setconfigReady(pervValue=>pervValue+1);
    }, [originalData,array]);
    useEffect(() => {
        if(configReady===0){return;}
        if(originalData.array.fieldX === array.fieldX && originalData.array.fieldY === array.fieldY && originalData.array.split === array.split){
        sourceX=originalData.source.x;
        sourceY=originalData.source.y;
        bitmap=originalData.bitmap;
        everyBitmapDraw();
        draw_canvas();
        }else{
            sourceX=Math.floor(xnum/2);
            sourceY=Math.floor(ynum/2);
            bitmap=twoDimensionArray(xnum,ynum);
            draw_circlecanvas();
            const canvas2 = canvas2Ref.current;
            const ctx2 = canvas2.getContext("2d");
            ctx2.clearRect(0, 0, width, height);
        }
        var space=20;
        var tip_space=3;
        draw_red();
        draw_canvas_background();

        line_triangle(space,tip_space,space,height-tip_space,10,Math.round(fieldY*1000)/1000+" mm");
        line_triangle(tip_space,height-space,width-tip_space,height-space,12,fieldX+" mm");
    }, [configReady]);
    function everyBitmapDraw() {
        const canvas2 = canvas2Ref.current;
        const ctx2 = canvas2.getContext("2d");
        for (var i = 0; i < xnum; i++) {
            for (var n = 0; n < ynum; n++) {
                var c = bitmap[i][n];
                if (c !== 0) {
                    ctx2.fillStyle = MEDIUM_COLOR[c];
                    ctx2.fillRect(i * canvasDx, n * canvasDy, canvasDx, canvasDy);
                }
            }
        }
    }



    function line_triangle(x1,y1,x2,y2,s,str_sentence){
        var muki=true;
        const canvas1 = canvas1Ref.current;
        const ctx1 = canvas1.getContext("2d");
        if(x1===x2){muki=true;}else{muki=false;}
        ctx1.strokeStyle="rgba(0,0,0,0.7)";
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
          var vector=1/8;
          ctx1.beginPath();
          ctx1.moveTo(x,y);
          var cos_x=Math.cos(rot*Math.PI+Math.PI*vector);
          var sin_y=Math.sin(rot*Math.PI+Math.PI*vector);
          ctx1.lineTo(x+s*cos_x,y+s*sin_y);
          cos_x=Math.cos(rot*Math.PI-Math.PI*vector);
          sin_y=Math.sin(rot*Math.PI-Math.PI*vector);
          ctx1.lineTo(x+s*cos_x,y+s*sin_y);
          ctx1.closePath();
          ctx1.strokeStyle = "rgba(0,0,0,0.7)"; //枠線の色
          ctx1.stroke();
          ctx1.fillStyle="rgba(0,0,0,0.7)";//塗りつぶしの色
          ctx1.fill();
        }
        function sentence(x1,y1,x2,y2){
            var muki=true;
            if(x1===x2){muki=true;}else{muki=false;}
    
            if(muki===true){
              //ctx1.fillStyle="rgba(255,255,255,1.0)";
              //ctx1.fillRect(10,y1+80,80,40);
              ctx1.font='500 18px times new roman,serif';  
                ctx1.fillStyle = "rgba(0,0,0,1.0)";
                ctx1.textBaseline = 'left';
                ctx1.textAlign = 'left';
              ctx1.fillText(str_sentence,x1-5,(y2-y1)*0.53);
            }else{
              //ctx1.fillStyle="rgb(255,255,255)";
              //ctx1.fillRect(x1+140,height-60,90,50);
              ctx1.font='500 18px times new roman,serif';  
                ctx1.fillStyle = "rgba(0,0,0,1.0)";
                ctx1.textBaseline = 'center';
                ctx1.textAlign = 'center';
              ctx1.fillText(str_sentence,(x2-x1)/2,y1+10);
            }
        }
    }
    function twoDimensionArray(a, b) {
        var x = new Array(a);
        for (var i = 0; i < a; i++) {
            x[i] = new Array(b);
        }
        for (var i = 0; i < a; i++) {
            for (var n = 0; n < b; n++) {
                x[i][n] = 0;
            }
        }
        return x;
    }
    function draw_canvas_background() {
        const canvas4 = canvas4Ref.current;
        const ctx4 = canvas4.getContext("2d");
        ctx4.clearRect(0, 0, width, height);
        line(0, 1, width, 1, 2, "black");
        line(1, 0, 1, height, 2, "black");
        line(0, height - 1, width, height - 1, 2, "black");
        line(width - 1, 0, width - 1, height, 2, "black");
        for (var i = 0; i < xnum; i++) {
            line(canvasDx * i, 0, canvasDx * i, height, 1, "rgba(0,0,0,0.2)");
        }
        for (var i = 0; i < ynum; i++) {
            line(0, canvasDy * i, width, canvasDy * i, 1, "rgba(0,0,0,0.2)");
        }
        function line(x1, y1, x2, y2, w, col) {
            ctx4.strokeStyle = col;
            ctx4.lineWidth = w;
            ctx4.beginPath();
            ctx4.moveTo(x1, y1);
            ctx4.lineTo(x2, y2);
            ctx4.stroke();
        }
    }

    function draw_red() {
        const canvas1 = canvas1Ref.current;
        const ctx1 = canvas1.getContext("2d");
        ctx1.clearRect(0, 0, width, height);
        ctx1.fillStyle = "rgb(255,0,0)";
        ctx1.fillRect(sourceX * canvasDx, sourceY * canvasDy, canvasDx, canvasDy);
    }
    function draw_circlecanvas(){
        const canvas3 = canvas3Ref.current;
        const ctx3 = canvas3.getContext("2d");
        let realRadius=lambda*width/fieldX;
        const scaleFactor = width / xnum;
        let numCircles = (width /realRadius > 10) ? 10 : width/realRadius;

        ctx3.clearRect(0, 0, width, height);

        sourceX=Math.floor(xnum/2);
        sourceY=Math.floor(ynum/2);
        for (let i = 0; i < numCircles; i++) {
            ctx3.beginPath();
            ctx3.arc(sourceX * scaleFactor, sourceY * scaleFactor, realRadius+i*(realRadius), 0, 2 * Math.PI);
            ctx3.strokeStyle = "rgba(0,0,255,0.6)";
            ctx3.lineWidth = 1;
            ctx3.stroke();
        }
        ctx3.restore();
    }
    function draw_canvas() {
        //width=200;
        const canvas3 = canvas3Ref.current;
        const ctx3 = canvas3.getContext("2d");
        console.log("width is : "+width);
        let realRadius=lambda*width/fieldX;
        console.log("REALRADIUS "+realRadius);
        console.log(" dddd p "+realRadius);
        const scaleFactor = width / xnum;
        //let canvasRadius=realRadius*scaleFactor;

        let numCircles = (width /realRadius > 30) ? 30 : width/realRadius;
        console.log(scaleFactor+" desu");
        ctx3.clearRect(0, 0, width, height);
        ctx3.save();

        var clippoint = [];
        var stepSize = 0.5;
        for (var deg = 0; deg < 2 * Math.PI; deg += 2 * Math.PI / 100) {
            var x = sourceX;
            var y = sourceY;
            var v = 0;
            while (v === 0 && (x > 0 && x < xnum - 1) && (y > 0 && y < ynum - 1)) {
                x += stepSize * (Math.cos(deg));
                y += stepSize * (Math.sin(deg));
                v = bitmap[Math.round(x)][Math.round(y)];
            }
            clippoint.push([Math.round(x), Math.round(y)]);
        }
        ctx3.beginPath();

        ctx3.moveTo(clippoint[0][0] * scaleFactor, clippoint[0][1] * scaleFactor);
        for (var i = 1; i < clippoint.length; i++) {
            ctx3.lineTo(clippoint[i][0] * scaleFactor, clippoint[i][1] * scaleFactor);
        }
        ctx3.closePath();
        //ctx5.fillStyle = "green";
        //ctx5.fill();
        ctx3.clip();

        for (let i = 0; i < numCircles; i++) {
            ctx3.beginPath();
            ctx3.arc(sourceX * scaleFactor, sourceY * scaleFactor, realRadius+i*(realRadius), 0, 2 * Math.PI);
            ctx3.strokeStyle = "rgba(0,0,255,0.6)";
            ctx3.lineWidth = 1;
            ctx3.stroke();
        }
        ctx3.restore();
    }
    //格子線
    //青い円
    //障害物
    //赤い点
    return (
        <Container>
            <Layout_Wrapper>
                <div style={{ width: width + "px", height: height + "px" }}>
                    <Canvas ref={canvas4Ref} width={width} height={height} style={{ opacity: 1.0 }} />
                    <Canvas ref={canvas3Ref} width={width} height={height} style={{ opacity: 1.0 }} />
                    <Canvas ref={canvas2Ref} width={width} height={height} style={{ opacity: 0.7 }} />
                    <Canvas ref={canvas1Ref} width={width} height={height} style={{ opacity: 1.0 }} />
                </div>
            </Layout_Wrapper>
        </Container>
    )
};