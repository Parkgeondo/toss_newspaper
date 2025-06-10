import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, RoundedBox } from '@react-three/drei'
import { Refresh_wrap } from "./styles"
import { useRef } from 'react';

function Spinner({count = 8, radius = 1}) {
  const box_array = Array.from({ length: count });
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 3
    }
  })

  return (
    <group ref={groupRef}>
      {box_array.map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <group rotation={[0, 0, angle + Math.PI / 2]} key={i}>
            <RoundedBox
              position={[radius, 0, 0]}
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
              args={[0.6, 0.9, 0.1]} // width, height, depth
              radius={0.08}           // 모서리 둥글기 (0~0.5 사이 추천)
              smoothness={6}          // 라운딩 부드러움 정도
            >
              <meshPhysicalMaterial
                color="#7779a3"      // 은은한 크리스탈 색 (마음대로!)
                transmission={0.8}  // 유리/크리스탈 효과 핵심!
                thickness={0.4}      // 굴절 깊이
                roughness={0.05}     // 거칠기 (0에 가까울수록 유리)
                metalness={0}      // 금속성 (0~1)
                ior={1.6}            // 굴절률 (유리/수정=1.5~2)
                transparent
                opacity={1}
                reflectivity={0.7}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </RoundedBox>
          </group>
        );
      })}
    </group>
  )
}

export default function Refresh3D() {
  return (
    <Refresh_wrap>
      <Canvas style={{ width: '350px', height: '350px' }}>
        <OrthographicCamera
          zoom={40}
          makeDefault
          position={[0, 4, 0]}
          near={0.01}
          far={100}
        />
        <ambientLight color="#bfd2ff" intensity={10} />
        <Spinner />
        <OrbitControls />
      </Canvas>
    </Refresh_wrap>
  )
}
