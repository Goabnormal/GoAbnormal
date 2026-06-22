import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function WaveMesh() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const position = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      position.setZ(
        i,
        Math.sin(x * 0.4 + time) * 0.5 +
          Math.cos(y * 0.4 + time) * 0.5
      );
    }

    position.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-1.1, 0, 0]}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[100, 100, 100, 100]} />

      <meshBasicMaterial
        color="#8a3dff"
        wireframe
      />
    </mesh>
  );
}

export default function WaveBackground() {
  return (
    <div className="three-bg">
      <Canvas camera={{ position: [0, 5, 10], fov: 55 }}>
<>
  <ambientLight intensity={1.5}/>
  <pointLight
    position={[0,5,5]}
    intensity={2}
    color="#ff4f9a"
  />
  <pointLight
    position={[5,5,5]}
    intensity={2}
    color="#5ce1ff"
  />
</>
        <WaveMesh />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}