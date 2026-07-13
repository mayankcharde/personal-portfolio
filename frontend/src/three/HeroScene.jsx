import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function DistortedBlob({ scrollProgress, mouse }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Idle slow rotations
    meshRef.current.rotation.y = time * 0.12;
    meshRef.current.rotation.x = time * 0.08;

    // React to scroll: rotate more based on scroll progress
    meshRef.current.rotation.z = scrollProgress * Math.PI * 0.75;
    
    // React to mouse movement with interpolation (lerp)
    const targetX = mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.6;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);

    // Dynamic distortion scale based on mouse position
    const distTarget = 0.35 + Math.abs(mouse.current.x * 0.15);
    meshRef.current.material.distort = THREE.MathUtils.lerp(meshRef.current.material.distort, distTarget, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#635BFF"
        emissive="#080816"
        roughness={0.15}
        metalness={0.9}
        distort={0.4}
        speed={1.8}
      />
    </mesh>
  );
}

export default function HeroScene({ scrollProgress }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Map to [-1, 1] range
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Lights - vibrant color highlights to give a deep space indigo vibe */}
        <ambientLight intensity={0.4} />
        
        {/* Electric Indigo directional light */}
        <directionalLight position={[5, 5, 2]} intensity={1.8} color="#635BFF" />
        
        {/* Cyan side light */}
        <directionalLight position={[-5, -2, 3]} intensity={2.2} color="#22D3EE" />
        
        {/* Lime subtle back/top highlight */}
        <pointLight position={[0, 4, -2]} intensity={1.2} color="#D4FF3F" />
        
        {/* Floating particles or the main interactive blob */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <DistortedBlob scrollProgress={scrollProgress} mouse={mouse} />
        </Float>
      </Canvas>
    </div>
  );
}
