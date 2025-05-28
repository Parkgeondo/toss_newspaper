// WavyNoiseBackground.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const WavyNoiseMaterial = shaderMaterial(
  { iTime: 0, iResolution: new THREE.Vector2() },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv * 3.0; // 확대
      float n = noise(uv + iTime * 0.1);

      vec3 color1 = vec3(0.96, 0.94, 1.0); // 부드러운 흰보라
      vec3 color2 = vec3(0.88, 0.92, 1.0); // 옅은 하늘색
      vec3 color3 = vec3(0.96, 0.98, 1.0); // 거의 흰색에 가까운 파스텔

      vec3 color = mix(color1, color2, n);
      color = mix(color, color3, smoothstep(0.4, 0.8, n));

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ WavyNoiseMaterial });

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
      <planeGeometry args={[4, 4]} />
      <wavyNoiseMaterial ref={materialRef} />
    </mesh>
  );
};

const WavyNoiseBackground = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }} orthographic camera={{ position: [0, 0, 1], zoom: 220 }}>
      <Plane />
    </Canvas>
  );
};

export default WavyNoiseBackground;
