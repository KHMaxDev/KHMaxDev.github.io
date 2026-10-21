export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.7} color="#d3d1d1" />
      <hemisphereLight args={['#18c79a', '#050a18', 0.9]} />
      <pointLight position={[6, 8, 6]} intensity={90} color="#23e0a8" distance={45} />
      <pointLight position={[-7, -3, 5]} intensity={60} color="#3d78ff" distance={45} />
      <spotLight
        position={[0, 11, 5]}
        angle={0.65}
        penumbra={1}
        intensity={120}
        color="#c6ffee"
        distance={55}
      />
    </>
  );
}
