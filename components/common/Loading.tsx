'use client';

import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Float,
  Center,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.04; // Increased from 0.01
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2.5} />;
}

useGLTF.preload('/video/dollar-sign.glb');

export function Loading() {
  return (
    <div className='relative flex items-center justify-center w-full min-h-[450px] bg-transparent overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none' />

      <div className='w-full h-[450px] relative z-10'>
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 8], fov: 35 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.7} />
            <spotLight
              position={[5, 10, 5]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />

            <Center>
              <Model url='/video/dollar-sign.glb' />
            </Center>

            <ContactShadows
              position={[0, -2.2, 0]}
              opacity={0.3}
              scale={6}
              blur={2.4}
              far={4.5}
            />
            <Environment preset='city' />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
