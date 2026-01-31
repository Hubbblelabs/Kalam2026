'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function EnergyOrb({ position, onCollect }: { position: [number, number, number], onCollect: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(true);

    useFrame((state) => {
        if (!meshRef.current || !active) return;

        // Rotation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.02;

        // Pulse effect
        const scale = hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

        // Float upwards slowly
        meshRef.current.position.y += 0.005;
        if (meshRef.current.position.y > 4) {
            meshRef.current.position.y = -4; // Reset height
        }
    });

    const handleClick = () => {
        if (!active) return;
        setActive(false);
        onCollect();
        // Respawn after delay
        setTimeout(() => {
            if (meshRef.current) {
                meshRef.current.position.y = -4 - Math.random() * 2;
                meshRef.current.position.x = (Math.random() - 0.5) * 15;
                setActive(true);
            }
        }, 2000);
    };

    return (
        <group visible={active}>
            <mesh
                ref={meshRef}
                position={position}
                onClick={handleClick}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial
                    color={hovered ? "#F5B301" : "#1C5D99"}
                    emissive={hovered ? "#F5B301" : "#1C5D99"}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe
                />
                {hovered && <Sparkles count={5} scale={1.5} color="#F5B301" />}
            </mesh>
        </group>
    );
}

function Scene({ onScore }: { onScore: () => void }) {
    // Generate random positions for orbs
    const orbs = useMemo(() => {
        return new Array(8).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 2
            ] as [number, number, number]
        }));
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

            {orbs.map((orb, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <EnergyOrb position={orb.position} onCollect={onScore} />
                </Float>
            ))}
        </>
    );
}

export function FooterScene({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
    const scoreRef = useRef(0);

    const handleScore = () => {
        scoreRef.current += 10;
        onScoreUpdate(scoreRef.current);
    };

    return (
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Scene onScore={handleScore} />
            </Canvas>
        </div>
    );
}
