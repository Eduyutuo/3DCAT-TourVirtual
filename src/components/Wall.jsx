import { Box } from '@react-three/drei'

/**
 * Wall — Static divider wall with PBR matte white material.
 * castShadow + receiveShadow for accurate shadow interplay.
 */
export default function Wall({ position, size, color = '#f8fafc', roughness = 0.9, metalness = 0.0 }) {
  return (
    <Box args={size} position={position} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={0.4}
      />
    </Box>
  )
}
