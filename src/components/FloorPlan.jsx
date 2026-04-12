import { Box, Plane } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import RoomMesh from './RoomMesh'
import Wall from './Wall'

// ─── Generic furniture primitive ─────────────────────────────────────────────
function Prop({ position, size, color, roughness = 0.8, metalness = 0.0 }) {
  return (
    <Box args={size} position={position} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={0.6}
      />
    </Box>
  )
}

// Cylinder via native mesh so we avoid drei API differences
function CylProp({ position, radiusTop, radiusBottom, height, color, roughness = 0.7, metalness = 0.1 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, 16]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} envMapIntensity={0.8} />
    </mesh>
  )
}

/**
 * FloorPlan — High-fidelity PBR apartment maquette.
 *
 * Three interactive room floors with PBR materials:
 *   Sala / Comedor — polished concrete (#a3a3a3) r=0.2 m=0.1
 *   Dormitorio     — oak wood (#d4b483)           r=0.6 m=0.0
 *   Baño           — ceramic (#e8f0fe)            r=0.12 m=0.06
 *
 * Props:
 *   selectedRoom   room data object | null
 *   onRoomSelect   callback(roomData)
 */
export default function FloorPlan({ selectedRoom, onRoomSelect }) {

  const rooms = [
    {
      id: 'sala',
      name: 'Sala / Comedor',
      area: '42 m²',
      icon: '🛋️',
      description:
        'Espacio social de doble altura con suelo de microcemento pulido. Ventanales de piso a techo que capturan la luz del atardecer para crear una atmósfera cálida e inspiradora.',
      highlights: ['Microcemento pulido', 'Ventanales panorámicos', 'Cocina americana integrada'],
      color: '#a3a3a3',
      roughness: 0.2,
      metalness: 0.1,
      position: [-2.6, 0.12, 0],
      size:     [5.2, 0.24, 6.2],
    },
    {
      id: 'dormitorio',
      name: 'Dormitorio Principal',
      area: '28 m²',
      icon: '🛏️',
      description:
        'Suite de roble natural con vestidor walk-in y baño en suite. La cálida tonalidad de la madera crea una sensación de calma y lujo residencial desde los primeros pasos.',
      highlights: ['Parquet de roble natural', 'Walk-in closet', 'Suite privada'],
      color: '#d4b483',
      roughness: 0.6,
      metalness: 0.0,
      position: [2.6, 0.12, -1.2],
      size:     [5.2, 0.24, 3.8],
    },
    {
      id: 'bano',
      name: 'Baño Completo',
      area: '10 m²',
      icon: '🛁',
      description:
        'Baño spa de porcelana italiana con ducha de lluvia de 400 mm y bañera exenta. Acabados antivaho de alta gama para disfrutar de un espacio sin precedentes.',
      highlights: ['Porcelana italiana', 'Ducha lluvia 400 mm', 'Bañera exenta'],
      color: '#e8f0fe',
      roughness: 0.12,
      metalness: 0.06,
      position: [2.6, 0.12, 2.1],
      size:     [5.2, 0.24, 2.0],
    },
  ]

  return (
    <group>
      {/* ── Environment HDRI — provides IBL reflections across all PBR surfaces ── */}
      <Environment preset="apartment" background={false} />

      {/* ── Ground plane ── */}
      <Plane
        args={[30, 30]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#1a1614"
          roughness={0.95}
          metalness={0.0}
          envMapIntensity={0.1}
        />
      </Plane>

      {/* ── Subtle wireframe grid overlay ── */}
      <Plane
        args={[30, 30]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.002, 0]}
      >
        <meshStandardMaterial
          color="#475569"
          roughness={1}
          transparent
          opacity={0.14}
          wireframe
        />
      </Plane>

      {/* ── Interactive room floors ── */}
      {rooms.map((room) => (
        <RoomMesh
          key={room.id}
          position={room.position}
          size={room.size}
          color={room.color}
          roughness={room.roughness}
          metalness={room.metalness}
          data={room}
          onSelect={onRoomSelect}
          isSelected={selectedRoom?.id === room.id}
        />
      ))}

      {/* ════ PERIMETER & INTERIOR WALLS ════ */}
      {/* Back */}
      <Wall position={[0, 0.7, -3.25]}   size={[10.4, 1.4, 0.14]} />
      {/* Front */}
      <Wall position={[0, 0.7, 3.25]}    size={[10.4, 1.4, 0.14]} />
      {/* Left */}
      <Wall position={[-5.2, 0.7, 0]}    size={[0.14, 1.4, 6.5]} />
      {/* Right */}
      <Wall position={[5.2, 0.7, 0]}     size={[0.14, 1.4, 6.5]} />
      {/* Interior vertical (sala ↔ bedrooms) */}
      <Wall position={[0, 0.65, 0]}      size={[0.14, 1.3, 6.5]} />
      {/* Horizontal (dormitorio ↔ baño) */}
      <Wall position={[2.6, 0.65, 1.15]} size={[5.2, 1.3, 0.14]} />

      {/* ════ SALA / COMEDOR ════ */}
      {/* Sofa body */}
      <Prop position={[-4.0, 0.4, -1.6]}  size={[2.4, 0.55, 0.9]}  color="#292524" roughness={0.92} />
      {/* Sofa back cushions */}
      <Prop position={[-4.0, 0.7, -1.95]} size={[2.0, 0.22, 0.1]}  color="#44403c" roughness={0.95} />
      {/* Coffee table top (glass-like) */}
      <Prop position={[-3.1, 0.28, -0.4]} size={[1.0, 0.05, 0.55]} color="#d1fae5" roughness={0.02} metalness={0.5} />
      {/* Coffee table leg x4 */}
      <Prop position={[-3.6, 0.15, -0.65]} size={[0.04, 0.28, 0.04]} color="#a1a1aa" roughness={0.3} metalness={0.9} />
      <Prop position={[-2.6, 0.15, -0.65]} size={[0.04, 0.28, 0.04]} color="#a1a1aa" roughness={0.3} metalness={0.9} />
      <Prop position={[-3.6, 0.15, -0.15]} size={[0.04, 0.28, 0.04]} color="#a1a1aa" roughness={0.3} metalness={0.9} />
      <Prop position={[-2.6, 0.15, -0.15]} size={[0.04, 0.28, 0.04]} color="#a1a1aa" roughness={0.3} metalness={0.9} />
      {/* TV cabinet */}
      <Prop position={[-1.3, 0.4, -3.0]}  size={[2.2, 0.7, 0.35]}  color="#0a0a0a" roughness={0.85} />
      {/* TV screen — near-perfect mirror */}
      <Prop position={[-1.3, 0.95, -3.1]} size={[2.0, 0.95, 0.03]} color="#050505" roughness={0.0} metalness={0.98} />
      {/* Dining table top */}
      <Prop position={[-3.0, 0.42, 2.0]}  size={[1.8, 0.07, 0.9]}  color="#c49a6c" roughness={0.52} />
      {/* Dining table legs */}
      <Prop position={[-2.15, 0.22, 1.6]} size={[0.06, 0.42, 0.06]} color="#b07d4c" roughness={0.55} />
      <Prop position={[-3.85, 0.22, 1.6]} size={[0.06, 0.42, 0.06]} color="#b07d4c" roughness={0.55} />
      <Prop position={[-2.15, 0.22, 2.4]} size={[0.06, 0.42, 0.06]} color="#b07d4c" roughness={0.55} />
      <Prop position={[-3.85, 0.22, 2.4]} size={[0.06, 0.42, 0.06]} color="#b07d4c" roughness={0.55} />
      {/* Pendant lamp — gold metallic */}
      <CylProp position={[-3.0, 1.22, 2.0]} radiusTop={0.12} radiusBottom={0.2} height={0.18} color="#d97706" roughness={0.25} metalness={0.9} />
      {/* Plant pot */}
      <CylProp position={[-4.8, 0.32, 2.9]} radiusTop={0.16} radiusBottom={0.2} height={0.45} color="#92400e" roughness={0.9} />
      <CylProp position={[-4.8, 0.68, 2.9]} radiusTop={0.26} radiusBottom={0.1} height={0.44} color="#15803d" roughness={0.95} />

      {/* ════ DORMITORIO ════ */}
      {/* Bed base */}
      <Prop position={[3.1, 0.3, -2.1]}  size={[2.0, 0.42, 2.4]} color="#e2e0dd" roughness={0.85} />
      {/* Mattress */}
      <Prop position={[3.1, 0.57, -2.1]} size={[1.9, 0.2, 2.2]}  color="#fafaf9" roughness={0.95} />
      {/* Headboard */}
      <Prop position={[3.1, 0.9, -3.2]}  size={[2.0, 0.88, 0.12]} color="#1c1917" roughness={0.72} />
      {/* Pillows */}
      <Prop position={[2.4, 0.73, -2.8]} size={[0.68, 0.13, 0.44]} color="#f5f5f4" roughness={0.95} />
      <Prop position={[3.8, 0.73, -2.8]} size={[0.68, 0.13, 0.44]} color="#f5f5f4" roughness={0.95} />
      {/* Nightstand */}
      <Prop position={[4.55, 0.36, -2.1]} size={[0.5, 0.5, 0.5]}  color="#c49a6c" roughness={0.55} />
      {/* Bedside lamp */}
      <CylProp position={[4.55, 0.72, -2.1]} radiusTop={0.1} radiusBottom={0.06} height={0.24} color="#fbbf24" roughness={0.4} metalness={0.55} />
      {/* Wardrobe */}
      <Prop position={[1.55, 0.7, -2.6]}  size={[0.7, 1.1, 1.8]}  color="#d1cdc9" roughness={0.7} />

      {/* ════ BAÑO ════ */}
      {/* Tub outer */}
      <Prop position={[3.8, 0.36, 2.75]} size={[1.6, 0.52, 0.85]} color="#f8fafc" roughness={0.08} metalness={0.04} />
      {/* Tub inner */}
      <Prop position={[3.8, 0.6, 2.75]}  size={[1.35, 0.2, 0.62]} color="#e2e8f0" roughness={0.06} />
      {/* Sink pedestal */}
      <CylProp position={[1.7, 0.35, 2.75]} radiusTop={0.22} radiusBottom={0.14} height={0.6} color="#f8fafc" roughness={0.1} />
      {/* Sink basin */}
      <Prop position={[1.7, 0.7, 2.75]}  size={[0.48, 0.09, 0.38]} color="#f0f4ff" roughness={0.06} metalness={0.04} />
      {/* Faucet chrome */}
      <Prop position={[1.7, 0.82, 2.58]} size={[0.06, 0.14, 0.06]} color="#e5e7eb" roughness={0.04} metalness={0.96} />
      {/* Toilet */}
      <Prop position={[2.6, 0.42, 2.85]} size={[0.44, 0.5, 0.58]}  color="#f8fafc" roughness={0.12} />
      <Prop position={[2.6, 0.72, 3.0]}  size={[0.42, 0.34, 0.18]} color="#f8fafc" roughness={0.12} />

      {/* ════ DECORATIVE ════ */}
      {/* Wall art canvas */}
      <Prop position={[-3.0, 1.1, -3.17]} size={[1.2, 0.8, 0.02]} color="#7c3aed" roughness={0.4} metalness={0.1} />
    </group>
  )
}
