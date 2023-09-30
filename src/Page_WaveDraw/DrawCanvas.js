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
  margin-bottom:10px;
  position:relative;
  display: inline-block;
  display:flex;
`
const Setting_Wrapper = styled.div`
  position:relative;
  background-color:rgb(240,240,240);
  min-width:200px;
  
  padding: 10px 10px 30px 3px;
  border-top: 5px double #000;
  border-right: 5px double #000;
  border-bottom: 5px double #000;
  border-left: none; /* left border is set to none */
  height:fit-content;
`
//margin-left:auto;
//margin-right:auto;
const Layout_Wrapper = styled.div`

`
const Setting_Inner = styled.div`
`
const Radio_Wrapper = styled.div`
  margin:top:10px;
  margin-left:3px;
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

const Icon_Wrapper = styled.div`
  width:29px;
  height:29px;
  margin-top:3px;
  margin-bottom:3px;
  margin:3px 8px 3px 3px;
  border:1px solid black;
`
const Icon_Inner = styled.div`
  width:100%;
  height:100%;
`
const Garbage_Inner = styled.div`
  position:relative;
  height:30px;
  width:40px;
`
const Label_Wrapper = styled.div`
  width:70px;
  display:flex;
  align-items: center;
`
const Input_Wrapper = styled.div`
position:relative;
display: flex;
  align-items: center;
  padding-right:5px;
  font-size: ${props => {
        if (props.length <= 2) return '18px';
        if (props.length <= 4) return '16px';
        if (props.length <= 6) return '12px';
        if (props.length <= 8) return '10px';
        if (props.length <= 10) return '8px';
        if (props.length <= 12) return '6px';

        return '4px';  // default
    }};
`
const InputLabel = styled.div`
align-items: center;
font-size:12px;
width:50px;
`
const Label = styled.label`
  font-size: 15px;
  display:flex;
  position:relative;
`
var drag; //ユーザーがマウスを押している状態かを取得する
var drag_source;//ユーザーが赤い点をドラッグ操作しているかを取得する
var start_x; //ユーザーがマウスを押し始めたx座標
var start_y; //ユーザーがマウスを押し始めたy座標
var end_x; //ユーザーが現在マウスを押しているx座標
var end_y; //ユーザーが現在マウスを押しているy座標
var canvasDx;
var canvasDy;
var object_index;
var sourceX;
var sourceY;
var bitmap;
var xnum;
var ynum;
var fieldX;
var fieldY;
var lambda;
const MEDIUM_COLOR = ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(0,0,200)', 'rgb(0,255,0)', 'rgb(255,180,0)'];
export const DrawCanvas = ({ data, setBitmap,mediumArray,setSource}) => {
    var [width, setwidth] = useState(0);
    var [height, setheight] = useState(0);
    var [OBJECTINDEX, SETOBJECTINDEX] = useState(1);

    const timeoutIdRef = useRef(); //draw_canvasはonMousemoveをして0.8秒経ってから実行する遅延用
    const canvas1Ref = useRef();
    const canvas2Ref = useRef();
    const canvas3Ref = useRef();
    const canvas4Ref = useRef();
    const timerRef = useRef(null); //onMousemoveを0.1秒ごとに実行する遅延用
    const timerbitmapRef=useRef(); //set_bitmapをbitmapを変えてから、0.5秒後に実行する遅延用

    const [configReady, setconfigReady] = useState(0);
    const [MediumArray, setMediumArray] = useState([]);
    useEffect(() => {
        setMediumArray(mediumArray);
    }, [mediumArray])
    useEffect(() => {
        if(configReady===0)return;
        everyBitmapDraw();
    }, [MediumArray])
    useEffect(() => {
        console.log(data);
        if(data===undefined)return;
        if (!data.array?.fieldX || !data.bitmap || !data.source) return;
        let array=data.array;
        let source=data.source;
        let Bitmap=data.bitmap;
        object_index = 1;
        fieldX=array.fieldX;
        object_index = 1;
        SETOBJECTINDEX(1);
        lambda=array.lambda;
        let dx = array.fieldX / array.split;
        xnum=array.split;
        ynum = Math.ceil(array.fieldY / dx);
        fieldY=ynum*dx;
        var H_height1 = window.innerHeight * 0.87;
        var H_height2= window.innerHeight-70;
        var S_width1 = window.innerWidth * 0.8;
        var S_width2 = window.innerWidth - 550;
        var H_height = (H_height1 < H_height2) ? H_height1 : H_height2;
        var H_width = (S_width1 < S_width2) ? S_width1 : S_width2;
        var bai = 2;
        while (H_height > bai * ynum && H_width > bai * array.split) {
            bai += 0.2;
        }
        canvasDx = bai;
        canvasDy = bai;
        setwidth(canvasDx * xnum);
        setheight(canvasDy * ynum);
        if(Bitmap.length===0){
            bitmap=twoDimensionArray(array.split, ynum);
            setBitmap(twoDimensionArray(array.split, ynum));
        }
        if((source.x===0 && source.y===0)  || (source.x>=xnum || source.y>=ynum)){
            let tmpx=Math.floor(xnum/2); let tmpy=Math.floor(ynum/2);
            let obj={...source,x:tmpx, y:tmpy};
            setSource(obj);
            sourceX=tmpx; sourceY=tmpy;
        }else{
            sourceX=source.x; sourceY=source.y;
        }
        drag = false;
        drag_source = false;
        setconfigReady(pervValue=>pervValue+1);
    }, [data]);
    useEffect(() => {
        if(configReady===0){return;}
        draw_canvas_background();
        draw();
        startTimer();
        const canvas1 = canvas1Ref.current;
        canvas1.addEventListener('mousedown', onMousedown, false); //canvas内でマウスを押した際、on_mousedown()メソッドを実行するアクションリスナーを作る
        canvas1.addEventListener('mousemove', onMousemove, false); //canvas内でマウスを動かした際、on_mousemove()メソッドを実行するアクションリスナーを作る
        canvas1.addEventListener('mouseup', onMouseup, false); //canvas内でマウスを離した際、on_mouseup()メソッドを実行するアクションリスナーを作る
        return () => {
            const canvas1 = canvas1Ref.current;
            if (canvas1) {
                canvas1.removeEventListener('mousedown', onMousedown);
                canvas1.removeEventListener('mousemove', onMousemove);
                canvas1.removeEventListener('mouseup', onMouseup);
            }
        };
    }, [configReady]);
    const startTimer = () => {
        timeoutIdRef.current = setTimeout(handleTimeout, 400);
    };
    const handleTimeout = () => {
        draw_canvas();
    };
    const startBitmapTimer=()=>{
        timerbitmapRef.current=setTimeout(handleBitmapTimeout,500);
    }
    const handleBitmapTimeout = () => {
        setBitmap(bitmap);
    };

    const handleUpdateSource = (newX,newY) => {
        setSource(prevSource => ({ ...prevSource, x: newX,y:newY}));
    }

    function onMousedown(e) {
        if (drag == false && drag_source == false) {

            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var index_x = Math.floor(x / canvasDx);
            var index_y = Math.floor(y / canvasDy);
            if (drag_source == false &&  (index_x == sourceX - 1 || index_x == sourceX || index_x == sourceX + 1) &&
            (index_y == sourceY - 1 || index_y == sourceY || index_y == sourceY + 1)) {
                drag_source = true;
            } else if (x <= width && y <= height) {
                start_x = x; start_y = y;
                end_x = start_x; end_y = start_y;
                bitmap_set(start_x / canvasDx, start_y / canvasDy, object_index);
                draw();
                drag = true;
            }
        }
    }
    function onMousemove(e) {
        if (!timerRef.current) {
            if (drag_source) {
                var rect = e.target.getBoundingClientRect();
                var x = (e.clientX - rect.left);
                var y = (e.clientY - rect.top);
                var index_x = Math.floor(x / canvasDx);
                var index_y = Math.floor(y / canvasDy);
                if (index_x >= 0 && index_x < xnum && index_y >= 0 && index_y < ynum) {
                    handleUpdateSource(index_x,index_y);
                    sourceX = index_x;
                    sourceY = index_y;
                    draw_red();
                }
            } else if (drag) {
                var rect = e.target.getBoundingClientRect();
                end_x = e.clientX - rect.left;
                end_y = e.clientY - rect.top;
                draw();
            }
            timerRef.current = setTimeout(() => {
                timerRef.current = null;
            }, 100);
        }
    }
    function onMouseup(e) {
        drag = false;
        drag_source = false;
        draw();
    }

    function everyBitmapDraw() {
        const canvas2 = canvas2Ref.current;
        const ctx2 = canvas2.getContext("2d");
        for (var i = 0; i < xnum; i++) {
            for (var n = 0; n < ynum; n++) {
                var c = bitmap[i][n];
                if (c === 0 || c >= MediumArray.length) {
                    ctx2.clearRect(i * canvasDx, n * canvasDy, canvasDx, canvasDy)
                    bitmap[i][n] = 0;
                } else {
                    ctx2.fillStyle = MEDIUM_COLOR[c];
                    ctx2.fillRect(i * canvasDx, n * canvasDy, canvasDx, canvasDy);
                }
            }
        }
        draw_canvas();
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
    function changeObjectIndex(index) {
        object_index = index;
        SETOBJECTINDEX(index);
    }
    function bitmap_set(x, y, i) {
        const canvas2 = canvas2Ref.current;
        const ctx2 = canvas2.getContext("2d");
        var index_x = Math.floor(x);
        var index_y = Math.floor(y);
        if ((index_x - 1) > xnum || (index_y - 1) > ynum) {
        } else {
            bitmap[index_x][index_y] = object_index;
        }
        startBitmapTimer();
        if (i === 0) {
            ctx2.clearRect(index_x * canvasDx, index_y * canvasDy, canvasDx, canvasDy)
        } else {
            ctx2.fillStyle = MEDIUM_COLOR[i];
            ctx2.fillRect(index_x * canvasDx, index_y * canvasDy, canvasDx, canvasDy);
        }
    }

    function draw_red() {
        const canvas1 = canvas1Ref.current;
        const ctx1 = canvas1.getContext("2d");
        ctx1.clearRect(0, 0, width, height);
        ctx1.fillStyle = "rgb(255,0,0)";
        ctx1.fillRect(Math.floor(sourceX) * canvasDx, Math.floor(sourceY) * canvasDy, canvasDx, canvasDy);
    }
    function draw() {
        clearTimeout(timeoutIdRef.current);
        startTimer();
        if (drag) {
            var disp_x;
            var disp_y;
            var w;
            var h;
            if (start_x < end_x) {
                disp_x = start_x;
                w = end_x - start_x;
            } else {
                disp_x = end_x;
                w = start_x - end_x;
            }
            if (start_y < end_y) {
                disp_y = start_y;
                h = end_y - start_y;
            } else {
                disp_y = end_y;
                h = start_y - end_y;
            }
            for (var i = Math.floor(disp_x / canvasDx); (disp_x + w) / canvasDx >= i; i++) {
                for (var n = Math.floor(disp_y / canvasDy); (disp_y + h) / canvasDy >= n; n++) {
                    bitmap_set(i, n, object_index);
                }
            }
        } else {
        }
        const canvas1 = canvas1Ref.current;
        const ctx1 = canvas1.getContext("2d");
        ctx1.clearRect(0, 0, width, height);
        ctx1.fillStyle = 'rgb(255,0,0)';
        ctx1.fillRect(Math.floor(sourceX) * canvasDx, Math.floor(sourceY) * canvasDy, canvasDx, canvasDy);
    }

    function draw_canvas() {
        const canvas3 = canvas3Ref.current;
        const ctx3 = canvas3.getContext("2d");

        let realRadius=lambda*width/fieldX;
        const scaleFactor = width / xnum;

        let numCircles = (width /realRadius > 30) ? 30 : width/realRadius;
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
            <Setting_Wrapper>
                <Radio_Wrapper>
                    <Container>
                        <Label>
                            <input type="radio" style={{ visibility: "hidden" }} />
                        </Label>
                        <Icon_Wrapper style={{ border: '0px solid white' }}></Icon_Wrapper>
                        <Label_Wrapper>
                            <InputLabel>複素誘電率実部</InputLabel>
                        </Label_Wrapper>
                        <Label_Wrapper>
                            <InputLabel>複素誘電率虚部</InputLabel>
                        </Label_Wrapper>
                        <Label_Wrapper>
                            <InputLabel>複素透磁率実部</InputLabel>
                        </Label_Wrapper>
                        <Label_Wrapper>
                            <InputLabel>複素透磁率虚部</InputLabel>
                        </Label_Wrapper>
                    </Container>
                    {MediumArray.map((column, index) => (
                        <Container key={index}>
                            <Label key={index}>
                                <input
                                    type="radio"
                                    checked={OBJECTINDEX === index}
                                    onChange={(e) => changeObjectIndex(index)}
                                />
                            </Label>
                            <Icon_Wrapper>
                                <Icon_Inner style={{ backgroundColor: MEDIUM_COLOR[index] }}></Icon_Inner>
                            </Icon_Wrapper>
                            <Input_Wrapper length={column.DielectricConstant.length}>
                                <div style={{ width: '60px', paddingLeft: '5px' }}>
                                    {column.DielectricConstant}
                                </div>
                            </Input_Wrapper>
                            <Input_Wrapper length={column.DielectricLoss.length}>
                                <div style={{ width: '60px', paddingLeft: '5px' }}>
                                    {column.DielectricLoss}
                                </div>
                            </Input_Wrapper>
                            <Input_Wrapper length={column.MagneticConstant.length}>
                                <div style={{ width: '60px', paddingLeft: '5px' }}>
                                    {column.MagneticConstant}
                                </div>
                            </Input_Wrapper>
                            <Input_Wrapper length={column.MagneticLoss.length}>
                                    {column.MagneticLoss}
                            </Input_Wrapper>
                        </Container>
                    ))}
                </Radio_Wrapper>
                <Setting_Info>
                    <Setting_setbut>
                    </Setting_setbut>
                </Setting_Info>
                <Setting_result>
                </Setting_result>
            </Setting_Wrapper>
        </Container>
    )
};