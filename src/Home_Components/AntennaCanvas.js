import styled from "styled-components";
import { useRef, useState, useEffect, useMemo } from 'react';
import { React } from 'react';

import {
  useCanvasAndWidthHeight,
  checker_ANTENNA,
  checker_NOCHANGE,
  checker_ONLYANTENNACHANGE,
  drawBackGround,
  drawAntenna,
  drawPolar,
  drawRadiationCircles
} from './AntennaCanvas_helper';
const Canvas = styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:1.0;
`
const Container = styled.div`
  position:relative;
  width:100%;
  height:100%;
`
const Layout_Wrapper = styled.div`
  position:relative;
  width:100%;
  height:100%;
`
var antGap;
var DomainWidLambda;
var phase;
var N;
export const AntennaCanvas = ({ antenna, view, rect }) => {
  const layoutWrapperRef = useRef(null); //canvasの親<div>Ref
  const ctx1Ref = useRef(null); const canvas1Ref = useRef(null);
  const ctx2Ref = useRef(null); const canvas2Ref = useRef(null);
  const ctx3Ref = useRef(null); const canvas3Ref = useRef(null);
  const prevAntenna = useRef(null);
  const prevView=useRef(null);
  const prevSide = useRef(null);
  const [side, setSide] = useState(0);
  const canvasRefs = useMemo(() => ({
    canvas1Ref, canvas2Ref, canvas3Ref
  }), [canvas1Ref, canvas2Ref, canvas3Ref]);
  const ctxRefs = useMemo(() => ({
    ctx1Ref, ctx2Ref, ctx3Ref
  }), [ctx1Ref, ctx2Ref, ctx3Ref]);

  useCanvasAndWidthHeight(layoutWrapperRef, canvasRefs, ctxRefs, setSide, rect);

  useEffect(() => {
    if (!checker_ANTENNA(antenna) || side === 0 || !view) return;
    if (checker_NOCHANGE(antenna, prevAntenna.current, side, prevSide) && view===prevView.current) return;
    if (checker_ONLYANTENNACHANGE(antenna, prevAntenna.current, side, prevSide) && view===prevView.current) {
      console.log("only antGap or phase");
      const { antGap: inputAntGap, phase: inputPhase, DomainWidLambda: inputDomainWidLambda, N: inputN } = antenna;
      antGap = inputAntGap;
      phase = inputPhase;
      DomainWidLambda = inputDomainWidLambda;
      N = inputN;
      const ctx3 = ctx3Ref.current;
      const ctx2 = ctx2Ref.current;
      const ctx1 = ctx1Ref.current;

      if (view === "wave") {
        drawAntenna(ctx2, side, antGap, DomainWidLambda, N);
        drawRadiationCircles(ctx1, side, DomainWidLambda, antGap, phase, N);
      } else if (view === "polar") {
        drawPolar(ctx1, ctx2, ctx3, side, antGap, phase, N);
      }

    } else {
      console.log("everything else");
      const { antGap: inputAntGap, phase: inputPhase, DomainWidLambda: inputDomainWidLambda, N: inputN } = antenna;
      antGap = inputAntGap;
      phase = inputPhase;
      DomainWidLambda = inputDomainWidLambda;
      N = inputN;
      const ctx3 = ctx3Ref.current;
      const ctx2 = ctx2Ref.current;
      const ctx1 = ctx1Ref.current;
      if (view === "wave") {
        drawBackGround(ctx3, side, DomainWidLambda);
        drawAntenna(ctx2, side, antGap, DomainWidLambda, N);
        drawRadiationCircles(ctx1, side, DomainWidLambda, antGap, phase, N);
      } else if (view === "polar") {
        drawPolar(ctx1, ctx2, ctx3, side, antGap, phase, N);
      }
    }

    prevSide.current = side;
    prevView.current=view;
    prevAntenna.current = antenna;

  }, [antenna, view, side])

  //放射円
  //アンテナ
  //壁
  return (
    <Container>
      <Layout_Wrapper ref={layoutWrapperRef}>
        <Canvas ref={canvas3Ref} />
        <Canvas ref={canvas2Ref} />
        <Canvas ref={canvas1Ref} />
      </Layout_Wrapper>
    </Container>
  )
}

