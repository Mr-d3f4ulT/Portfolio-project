import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const seededRandom = (seed) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

const Particles = ({ count = 200 }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const seed = i + 1;
      temp.push({
        position: [
          (seededRandom(seed * 1.7) - 0.5) * 10,
          seededRandom(seed * 2.3) * 10 + 5,
          (seededRandom(seed * 3.1) - 0.5) * 10,
        ],
        speed: 0.005 + seededRandom(seed * 4.9) * 0.001,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = seededRandom(i + y + 17) * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    particles.forEach((p, i) => {
      values[i * 3] = p.position[0];
      values[i * 3 + 1] = p.position[1];
      values[i * 3 + 2] = p.position[2];
    });

    return values;
  }, [count, particles]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
