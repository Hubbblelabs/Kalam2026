'use client';

import { useRef, useMemo, useCallback, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

// Hook to get theme colors from CSS variables
function useThemeColor(variable: string, fallback: string) {
    const [color, setColor] = useState(fallback);

    useEffect(() => {
        const updateColor = () => {
            if (typeof window === 'undefined') return;
            const val = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
            if (val) setColor(val);
        };

        updateColor();

        // Listen for class changes on html element (for theme switching)
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

        return () => observer.disconnect();
    }, [variable]);

    return color;
}

// Particle count for different screen sizes
const PARTICLE_COUNT = 800;

interface ParticleFieldProps {
    mousePosition: React.RefObject<{ x: number; y: number }>;
}

function ParticleField({ mousePosition }: ParticleFieldProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const themeBlue = useThemeColor('--color-secondary-500', '#1C5D99');

    // Generate particle positions
    const particles = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const scales = new Float32Array(PARTICLE_COUNT);
        const speeds = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Spread particles across viewport
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

            scales[i] = Math.random() * 0.5 + 0.1;
            speeds[i] = Math.random() * 0.5 + 0.2;
        }

        return { positions, scales, speeds };
    }, []);

    // Animation
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const mesh = meshRef.current;
        const time = state.clock.elapsedTime;
        const mouse = mousePosition.current;

        const tempObject = new THREE.Object3D();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Base position with gentle float
            let x = particles.positions[i3] + Math.sin(time * particles.speeds[i] + i) * 0.3;
            let y = particles.positions[i3 + 1] + Math.cos(time * particles.speeds[i] * 0.8 + i) * 0.3;
            let z = particles.positions[i3 + 2];

            // Mouse influence - particles move away from cursor
            if (mouse) {
                const mouseX = (mouse.x / window.innerWidth) * 2 - 1;
                const mouseY = -(mouse.y / window.innerHeight) * 2 + 1;

                const dx = x - mouseX * viewport.width * 0.5;
                const dy = y - mouseY * viewport.height * 0.5;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 3) {
                    const force = (3 - dist) / 3;
                    x += dx * force * 0.3;
                    y += dy * force * 0.3;
                }
            }

            tempObject.position.set(x, y, z);
            tempObject.scale.setScalar(particles.scales[i] * (1 + Math.sin(time + i) * 0.2));
            tempObject.updateMatrix();
            mesh.setMatrixAt(i, tempObject.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
    });

    // Create materials for particles
    const blueMaterial = useMemo(() =>
        new THREE.MeshBasicMaterial({
            color: themeBlue,
            transparent: true,
            opacity: 0.6
        }), [themeBlue]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <primitive object={blueMaterial} attach="material" />
        </instancedMesh>
    );
}

// Floating 3D shapes
function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null);
    const themeBlue = useThemeColor('--color-secondary-500', '#1C5D99');
    const themeGold = useThemeColor('--color-accent-500', '#F5B301');
    const themeDark = useThemeColor('--color-neutral-dark', '#1C2533');

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={groupRef}>
            {/* Blue Icosahedron */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
                <Icosahedron args={[0.8]} position={[-6, 2, -3]}>
                    <meshStandardMaterial
                        color={themeBlue}
                        wireframe
                        transparent
                        opacity={0.4}
                    />
                </Icosahedron>
            </Float>

            {/* Gold Torus Knot */}
            <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
                <TorusKnot args={[0.4, 0.15, 64, 16]} position={[5, -1, -4]}>
                    <meshStandardMaterial
                        color={themeGold}
                        wireframe
                        transparent
                        opacity={0.5}
                    />
                </TorusKnot>
            </Float>

            {/* Small blue octahedron */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Octahedron args={[0.5]} position={[-4, -3, -2]}>
                    <meshStandardMaterial
                        color={themeBlue}
                        transparent
                        opacity={0.3}
                    />
                </Octahedron>
            </Float>

            {/* Another gold shape top right */}
            <Float speed={1} rotationIntensity={0.3} floatIntensity={2.5}>
                <Icosahedron args={[0.6]} position={[6, 3, -5]}>
                    <meshStandardMaterial
                        color={themeGold}
                        wireframe
                        transparent
                        opacity={0.35}
                    />
                </Icosahedron>
            </Float>

            {/* Center decoration - subtle */}
            <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
                <Octahedron args={[0.3]} position={[0, 0, -6]}>
                    <meshStandardMaterial
                        color={themeDark}
                        transparent
                        opacity={0.15}
                    />
                </Octahedron>
            </Float>
        </group>
    );
}

// Main Scene
function Scene({ mousePosition }: { mousePosition: React.RefObject<{ x: number; y: number }> }) {
    const themeBlue = useThemeColor('--color-secondary-500', '#1C5D99');
    const themeGold = useThemeColor('--color-accent-500', '#F5B301');

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={themeGold} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={themeBlue} />

            <ParticleField mousePosition={mousePosition} />
            <FloatingShapes />
        </>
    );
}

// Error fallback component
function Fallback() {
    return null;
}

export function ThreeBackground() {
    const mousePosition = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
    }, []);

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ pointerEvents: 'auto' }}
            >
                <Suspense fallback={<Fallback />}>
                    <Scene mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}
