import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

/**
 * RoomMesh — Interactive PBR floor slab.
 *
 * Hover: Y-lift spring via useFrame (no React state updates per frame).
 * Click: fires onSelect callback.
 *
 * Key fix: never call React setState inside useFrame.
 * All animation data lives in refs only.
 */
export default function RoomMesh({
  position,
  size,
  color,
  roughness = 0.5,
  metalness = 0.0,
  data,
  onSelect,
  isSelected,
}) {
  const groupRef   = useRef()
  const matRef     = useRef()

  // Spring targets stored in refs — no React state
  const hovered         = useRef(false)
  const currentOffsetY  = useRef(0)
  const currentEmit     = useRef(0)

  // ── Spring animation ──────────────────────────────────────────────────────
  useFrame((_, delta) => {
    const isHov = hovered.current
    const isSel = isSelected

    const targetY    = isSel ? 0.18 : isHov ? 0.10 : 0
    const targetEmit = isSel ? 0.28 : isHov ? 0.14 : 0

    // Lerp factor — clamped to avoid overshoot
    const k = Math.min(delta * 8, 1)

    currentOffsetY.current += (targetY    - currentOffsetY.current) * k
    currentEmit.current    += (targetEmit - currentEmit.current)    * k

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + currentOffsetY.current
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = currentEmit.current
    }
  })

  // Compute colours (only recalculated on React render, not every frame)
  const baseColor    = new THREE.Color(color)
  const selectBlend  = isSelected
    ? baseColor.clone().lerp(new THREE.Color('#93c5fd'), 0.4)
    : baseColor
  const emissiveClr  = isSelected
    ? new THREE.Color('#3b82f6')
    : new THREE.Color('#6ee7b7')

  return (
    <group ref={groupRef} position={position}>
      <Box
        args={size}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation()
          hovered.current = true
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          hovered.current = false
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(data)
        }}
      >
        <meshStandardMaterial
          ref={matRef}
          color={selectBlend}
          roughness={roughness}
          metalness={metalness}
          emissive={emissiveClr}
          emissiveIntensity={0}
          envMapIntensity={1.4}
        />
      </Box>
    </group>
  )
}
