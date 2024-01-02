import React, { useRef, useMemo } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, SpriteMaterial, Sprite } from "three";

function Globe({ position, location }) {
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    let x = -(radius * Math.sin(phi) * Math.cos(theta));
    let z = radius * Math.sin(phi) * Math.sin(theta);
    let y = radius * Math.cos(phi);
    return [x, y, z];
  };

  const meshRef = useRef();
  const globeTexture = useLoader(TextureLoader, "/atlas.jpeg");
  const locationTexture = useLoader(TextureLoader, "/location.png");
  const { radius } = useThree().camera;
  const locationPosition = useMemo(
    () => latLongToVector3(location.lat, location.lon),
    [location, radius]
  );

  const spriteMaterial = new SpriteMaterial({ map: locationTexture });
  const sprite = new Sprite(spriteMaterial);
  sprite.position.set(...locationPosition);
  sprite.scale.set(0.5, 0.5, 0.5);

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#00308F"
        map={globeTexture}
        object={sprite}
      />
      <primitive object={sprite} />
    </mesh>
  );
}

export default Globe;
