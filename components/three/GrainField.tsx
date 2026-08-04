'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BRAND_COLORS = ['#1F7A6D', '#C4A361', '#F5F0E8']

function Grains({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Stable per-instance placement and drift, generated once.
  const grains = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 9,
        z: (Math.random() - 0.5) * 6,
        rx: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        speed: 0.15 + Math.random() * 0.35,
        drift: 0.4 + Math.random() * 0.8,
        scale: 0.5 + Math.random() * 0.7,
      })),
    [count]
  )

  const colors = useMemo(() => {
    const array = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      color.set(BRAND_COLORS[i % BRAND_COLORS.length])
      array[i * 3] = color.r
      array[i * 3 + 1] = color.g
      array[i * 3 + 2] = color.b
    }
    return array
  }, [count])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < grains.length; i++) {
      const g = grains[i]
      // Slow vertical fall that wraps, with a lateral sway.
      const y = ((g.y - t * g.speed + 4.5) % 9) - 4.5
      dummy.position.set(g.x + Math.sin(t * 0.3 + g.rx) * g.drift, y, g.z)
      dummy.rotation.set(g.rx + t * 0.2, 0, g.rz + t * 0.15)
      dummy.scale.setScalar(g.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Elongated capsule reads as a grain/seed at this scale. */}
      <capsuleGeometry args={[0.035, 0.11, 4, 8]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </capsuleGeometry>
      <meshStandardMaterial
        vertexColors
        roughness={0.45}
        metalness={0.05}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  )
}

export default function GrainField({ count = 420 }: { count?: number }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-5, -3, 2]} intensity={0.35} color="#C4A361" />
      <Grains count={count} />
    </Canvas>
  )
}
