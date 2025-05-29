import { useRef, useEffect } from "react";
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

function AnimatedWave() {
  const ref = useRef();

  // Define control points
  const start = new THREE.Vector3(-5, -1, 0);
  const control1 = new THREE.Vector3(-1, 2, 0);
  const control2 = new THREE.Vector3(1, -2, 0);
  const end = new THREE.Vector3(2, 9, 0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    control1.y = 2 + Math.sin(t) * 4.3;
    control2.y = -2 + Math.cos(t) * 4.3;

    const dynamicCurve = new THREE.CubicBezierCurve3(
      start,
      control1,
      control2,
      end
    );
    const updatedPoints = dynamicCurve.getPoints(100);
    ref.current.setPoints(updatedPoints);
  });

  return (
    <mesh>
      <meshLineGeometry ref={ref} />
      <meshLineMaterial
        color={"#aabfff"}
        lineWidth={1.25}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaveBezierScene() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 100 }}
      style={{
        width: "900px",
        height: "900px",
        background: "#f5f7fa",
        filter: "blur(32px)",
        left: '-262.5px',
        top: '-43px'
      }}
    >
      <AnimatedWave />

      <EffectComposer multisampling={4}>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          kernelSize={KernelSize.VERY_LARGE}
        />
        <DepthOfField
          focusDistance={0.015}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
