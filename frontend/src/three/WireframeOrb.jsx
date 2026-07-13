import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function InteractiveOrb() {
  const outerOrbRef = useRef();
  const innerOrbRef = useRef();
  const ringRef = useRef();
  const pointsRef = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Continuous animation and mouse interaction
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Base continuous rotation
    if (outerOrbRef.current) {
      outerOrbRef.current.rotation.y = elapsedTime * 0.12;
      outerOrbRef.current.rotation.x = elapsedTime * 0.05;
      
      // Subtly tip based on mouse position
      outerOrbRef.current.rotation.y += mouse.x * 0.15;
      outerOrbRef.current.rotation.x += mouse.y * 0.15;
    }

    if (innerOrbRef.current) {
      innerOrbRef.current.rotation.y = -elapsedTime * 0.18;
      innerOrbRef.current.rotation.x = -elapsedTime * 0.08;
      innerOrbRef.current.rotation.y += mouse.x * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = elapsedTime * 0.2;
      ringRef.current.rotation.x = 1.2 + mouse.y * 0.1;
      ringRef.current.rotation.y = mouse.x * 0.1;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsedTime * 0.04;
      pointsRef.current.rotation.x = elapsedTime * 0.02;
    }
  });

  // Generate particle coordinate array
  const particleCount = 180;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 0.8; // layer outside the sphere
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <group>
      {/* Outer Cyan Wireframe Sphere */}
      <mesh ref={outerOrbRef}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial 
          color="#22D3EE" 
          wireframe 
          transparent 
          opacity={0.16} 
          depthWrite={false}
        />
      </mesh>

      {/* Inner Indigo Wireframe Icosahedron */}
      <mesh ref={innerOrbRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial 
          color="#635BFF" 
          wireframe 
          transparent 
          opacity={0.25} 
          depthWrite={false}
        />
      </mesh>

      {/* Futuristic Orbiting Satellite Ring */}
      <mesh ref={ringRef} rotation={[1.2, 0, 0]}>
        <ringGeometry args={[2.1, 2.15, 64]} />
        <meshBasicMaterial 
          color="#D4FF3F" 
          side={2} 
          transparent 
          opacity={0.3} 
          depthWrite={false}
        />
      </mesh>

      {/* Holographic Particle Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#22D3EE" 
          size={0.035} 
          sizeAttenuation={true} 
          transparent 
          opacity={0.6}
        />
      </points>
    </group>
  );
}

export default function WireframeOrb() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative flex items-center justify-center">
      {/* Tech corner decorators for 3D HUD frame */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-secondary/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-secondary/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-secondary/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-secondary/30 pointer-events-none" />
      
      {/* HUD diagnostic coordinate overlay */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-secondary/40 select-none hidden md:block">
        SYS_MODEL: ORB_LOK_329<br />
        STATUS: ROTATING_ACTIVE<br />
        LATENCY: 0.42ms
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-highlight/50 select-none tracking-widest hidden md:block">
        GRID_REF // 89.28.X9
      </div>

      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <InteractiveOrb />
      </Canvas>
    </div>
  );
}
