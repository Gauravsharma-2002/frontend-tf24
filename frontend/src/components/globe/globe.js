import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import atlas from '../../images/atlas.jpeg';
import { OrbitControls } from "@react-three/drei";

function Globe() {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, atlas);

  useFrame(() => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[1,2,9]} >
      <OrbitControls/>
      <sphereGeometry args={[6.6, 150, 150]} />
      <meshStandardMaterial
        attach="material"
        color="#87CEEB"
        speed={1}
        factor={0.6}
        transparent
        map={texture}
      />
    </mesh>
  );
}

export default Globe;
