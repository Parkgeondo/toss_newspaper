// WavyShaderCard.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Define ShaderMaterial using drei's helper
const GradientMaterial = shaderMaterial(
  { iTime: 0, iResolution: new THREE.Vector2() },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      vec2 p[4];
      p[0] = vec2(0.1, 0.4);
      p[1] = vec2(0.9, 0.9);
      p[2] = vec2(cos(iTime * 2.0), sin(iTime * 1.0)) * 0.3 + vec2(0.5, 0.1);;
      p[3] = vec2(cos(iTime * 3.0), sin(iTime * 3.0)) * 0.3 + vec2(0.3, 0.5);

      vec3 c[4];
      c[0] = vec3(0.8, 0.8, 0.9);
      c[1] = vec3(0.9, 0.9, 0.97);
      c[2] = vec3(0.94, 0.94, 0.98);
      c[3] = vec3(0.76, 0.74, 0.89);

      float blend = 1.0;
      vec3 sum = vec3(0.0);
      float valence = 0.0;

      for (int i = 0; i < 4; i++) {
        float dist = length(uv - p[i]);
        if (dist == 0.0) dist = 1.0;
        float w = 1.0 / pow(dist, blend);
        sum += w * c[i];
        valence += w;
      }

      sum /= valence;
      gl_FragColor = vec4(sum, 1.0);
    }
  `
);

extend({ GradientMaterial });

const Plane = () => {
  const materialRef = useRef();
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.iTime = clock.getElapsedTime();
      materialRef.current.iResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3, 1]} />
      <gradientMaterial ref={materialRef} />
    </mesh>
  );
};

const WavyShader_Tab = ({ color = [1, 1, 1] }) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }} orthographic camera={{ position: [0, 0, 1], zoom: 100 }}>
      <Plane color={color} />
    </Canvas>
  );
};

export default WavyShader_Tab;
