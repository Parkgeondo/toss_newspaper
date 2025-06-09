// components/ThreeSpinner.js
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Refresh_wrap } from "./styles"

function Spinner() {
  return (
    <mesh>
      <boxGeometry args={[1,3,3]}/>
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  )
}

export default function Refresh() {
  return (
    <Refresh_wrap>
      <Canvas camera={{ position: [0, 0, 3]}} style={{width:'350px', height:'350px'}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Spinner />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </Refresh_wrap>
  )
}
