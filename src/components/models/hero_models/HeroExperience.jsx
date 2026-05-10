import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });
  const lowPowerMode = isMobile || prefersReducedMotion;

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={lowPowerMode ? [1, 1] : [1, 1.5]}
      frameloop={lowPowerMode ? "demand" : "always"}
      gl={{
        antialias: !lowPowerMode,
        powerPreference: lowPowerMode ? "low-power" : "high-performance",
      }}
      performance={{ min: 0.5 }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        enableDamping={!lowPowerMode}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <HeroLights lowPower={lowPowerMode} />
      {!lowPowerMode && <Particles count={90} />}
      <Suspense fallback={null}>
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
