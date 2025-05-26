// WavyShaderCard.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Define ShaderMaterial using drei's helper
const GradientMaterial_tab = shaderMaterial(
   {
    iTime: 0,
    iResolution: new THREE.Vector2(),
    uColor0: new THREE.Vector3(),
    uColor1: new THREE.Vector3(),
    uColor2: new THREE.Vector3(),
    uColor3: new THREE.Vector3(), // 메인 컬러
  },
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
    uniform vec3 uColor0;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      vec2 p[4];
      p[0] = vec2(0.1, 0.4);
      p[1] = vec2(0.9, 0.9);
      p[2] = vec2(cos(iTime * 1.0), sin(iTime * 1.0)) * 0.3 + vec2(0.5, 0.1);;
      p[3] = vec2(cos(iTime * 3.0), sin(iTime * 0.0)) * 0.3 + vec2(0.3, 0.5);

      vec3 c[4];
      c[0] = uColor0;
      c[1] = uColor1;
      c[2] = uColor2;
      c[3] = uColor3;

      float blend = 3.0;
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

extend({ GradientMaterial_tab });

const Plane = ({ color }) => {
  const materialRef = useRef();
  const { size } = useThree();

  const origin = new THREE.Vector3(...color); // c[3]
  const base = origin.clone().multiplyScalar(2.3); // c[3]
  const darker = origin.clone().multiplyScalar(1.6); // c[2]
  const moreDarker = origin.clone().multiplyScalar(1.8); // c[1]
  const darkest = origin.clone().multiplyScalar(1.9); // c[0]

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.iTime = clock.getElapsedTime();
      materialRef.current.iResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3, 1]} />
      <gradientMaterial_tab
        ref={materialRef}
        uColor0={darkest}
        uColor1={moreDarker}
        uColor2={darker}
        uColor3={base}
      />
    </mesh>
  );
};

const WavyShader_Tab = ({ color }) => {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 100 }}
      style={{ width: 231.33, height: 12 }} // 고정
    >
      <Plane color={color} />
    </Canvas>
  );
};

export default WavyShader_Tab;
