"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleVortex() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 6000;

  // Store base positions to return to after repel
  const basePositions = useMemo(() => new Float32Array(count * 3), [count]);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const neonBlue = new THREE.Color("#00f3ff");
    const neonMagenta = new THREE.Color("#ff00ff");
    const deepBlue = new THREE.Color("#0044ff");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral vortex distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3 + 0.5;
      const armOffset = (i % 3) * ((Math.PI * 2) / 3);
      const spiralAngle = angle + armOffset + radius * 0.8;
      const spread = (Math.random() - 0.5) * 0.8;

      const x = Math.cos(spiralAngle) * radius + spread;
      const y = (Math.random() - 0.5) * 3;
      const z = Math.sin(spiralAngle) * radius + spread;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      // Color based on radius - white towards center, cyan at edges
      const colorMix = radius / 3.5;
      const particleColor = new THREE.Color();
      if (colorMix < 0.3) {
        particleColor.lerpColors(white, neonBlue, colorMix / 0.3);
      } else if (colorMix < 0.7) {
        particleColor.lerpColors(neonBlue, deepBlue, (colorMix - 0.3) / 0.4);
      } else {
        // Less magenta, more deep blue/cyan mix
        particleColor.lerpColors(deepBlue, white, (colorMix - 0.7) / 0.3);
      }

      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;
    }

    return { positions, colors };
  }, [basePositions]);

  // Target rotation for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    // 1. Parallax Rotation based on pointer
    // state.pointer holds normalized device coordinates (-1 to +1)
    targetRotation.current.x = (state.pointer.y * Math.PI) / 8; // subtle tilt limit
    targetRotation.current.y = (state.pointer.x * Math.PI) / 8;

    // Smoothly interpolate current rotation towards target + base idle rotation
    pointsRef.current.rotation.x += (targetRotation.current.x + Math.sin(t * 0.03) * 0.15 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetRotation.current.y + t * 0.06 - pointsRef.current.rotation.y) * 0.05;

    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 0.2) * 0.02;
    pointsRef.current.scale.set(scale, scale, scale);

    // 2. Hover Repel logic
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const array = posAttribute.array as Float32Array;

    // Convert mouse coordinates to 3D space rough approximation at z=0
    // (A true raycaster is expensive for 6000 points, so we estimate based on the camera FOV)
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    // Account for the object's inverse rotation so the math aligns with world space mouse
    const cosY = Math.cos(-pointsRef.current.rotation.y);
    const sinY = Math.sin(-pointsRef.current.rotation.y);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const baseX = basePositions[i3];
      const baseY = basePositions[i3 + 1];
      const baseZ = basePositions[i3 + 2];

      // Rotate base point to world space to check against mouse
      const worldX = baseX * cosY - baseZ * sinY;

      // Calculate 2D distance to mouse
      const dx = mouseX - worldX;
      const dy = mouseY - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const repelRadius = 1.5;
      const repelForce = 0.5;

      if (dist < repelRadius) {
        // Calculate repulsion vector (normalized)
        const force = (repelRadius - dist) / repelRadius;
        const pushX = (dx / dist) * force * repelForce * -1; // Push away (-1)
        const pushY = (dy / dist) * force * repelForce * -1;

        // Rotate the push vector back to local space
        const localPushX = pushX * cosY + 0 * sinY; // Simplify assuming pushZ is mostly handled by X rotation
        const localPushZ = -pushX * sinY + 0 * cosY;

        // Lerp towards repelled position
        array[i3] += ((baseX + localPushX) - array[i3]) * 0.1;
        array[i3 + 1] += ((baseY + pushY) - array[i3 + 1]) * 0.1;
        array[i3 + 2] += ((baseZ + localPushZ) - array[i3 + 2]) * 0.1;
      } else {
        // Lerp back to base position
        array[i3] += (baseX - array[i3]) * 0.05;
        array[i3 + 1] += (baseY - array[i3 + 1]) * 0.05;
        array[i3 + 2] += (baseZ - array[i3 + 2]) * 0.05;
      }
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function InnerGlow() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color="#00f3ff" transparent opacity={0.08} />
    </mesh>
  );
}

function SecondaryRing() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4.5 + (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.getElapsedTime() * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={0.012}
        color="#00f3ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: "#050505" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <ParticleVortex />
        <SecondaryRing />
        <InnerGlow />
      </Canvas>
      {/* Radial gradient overlay to darken edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 70%, rgba(5,5,5,0.95) 100%)",
        }}
      />
    </div>
  );
}
