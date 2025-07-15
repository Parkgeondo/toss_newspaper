import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

extend({ MeshLineGeometry, MeshLineMaterial });

function AnimatedWave({ start, control1, control2, end, color }) {
  const ref = useRef();

  // 움직이는 control 포인트를 복사해서 따로 저장
  const control1Ref = useRef(control1.clone());
  const control2Ref = useRef(control2.clone());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 애니메이션 적용
    control1Ref.current.y = control1.y + Math.sin(t) * 1.3;
    control2Ref.current.y = control2.y + Math.cos(t) * 1.3;

    const dynamicCurve = new THREE.CubicBezierCurve3(
      start,
      control1Ref.current,
      control2Ref.current,
      end
    );
    const updatedPoints = dynamicCurve.getPoints(100);
    ref.current.setPoints(updatedPoints);
  });

  return (
    <mesh>
      <meshLineGeometry ref={ref} />
      <meshLineMaterial
        color={color}
        lineWidth={0.25}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaveBezierScene({ isSavedNewsMode }) {

  const start_1 = new THREE.Vector3(-5, 7, 0);
  const control1_1 = new THREE.Vector3(-1, 4, 0);
  const control2_1 = new THREE.Vector3(1, 0, 0);
  const end_1 = new THREE.Vector3(9, 9, 0);

  const start_2 = new THREE.Vector3(-5, 4, 0);
  const control1_2 = new THREE.Vector3(0, 2, 0);
  const control2_2 = new THREE.Vector3(2, 4, 0);
  const end_2 = new THREE.Vector3(9, 9, 0);

  const start_3 = new THREE.Vector3(-5, 7, 0);
  const control1_3 = new THREE.Vector3(0, -4, 0);
  const control2_3 = new THREE.Vector3(2, 9, 0);
  const end_3 = new THREE.Vector3(9, 9, 0);

  const [color, setColor] = useState("#D7F6FF");

  useEffect(() => {
    if (isSavedNewsMode) {
      setColor("linear-gradient(0deg, #000000 0%, #3A3E51 100%)");
    } else {
      setColor("#f5f7fa");
    }
  }, [isSavedNewsMode]);

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 100 }}
      style={{
        zIndex:"-100",
        width: "900px",
        height: "900px",
        background: color,
        filter: "blur(50px)",
        left: '-262.5px',
        top: '-43px'
      }}
    >  
      {!isSavedNewsMode && <AnimatedWave
        start={start_3}
        control1={control1_3}
        control2={control2_3}
        end={end_3}
        color={"#D7F6FF"}
      />}
      {!isSavedNewsMode && <AnimatedWave
        start={start_2}
        control1={control1_2}
        control2={control2_2}
        end={end_2}
        color={"#E3D3FF"}
      />}
      {!isSavedNewsMode && <AnimatedWave
        start={start_1}
        control1={control1_1}
        control2={control2_1}
        end={end_1}
        color={"#CEDEFF"}
      />}


      <EffectComposer multisampling={1}>
        <Bloom
          // intensity={0.3}
          // luminanceThreshold={0.2}
          // kernelSize={KernelSize.VERY_LARGE}
        />
        <DepthOfField
          // focusDistance={0.015}
          // focalLength={0.02}
          // bokehScale={2}
          // height={480}
        />
        {/* <Vignette eskil={false} offset={0.1} darkness={0.7} /> */}
      </EffectComposer>
    </Canvas>
  );
}
