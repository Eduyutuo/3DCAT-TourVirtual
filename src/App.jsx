import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'

// Scene
import FloorPlan from './components/FloorPlan'
// UI
import InfoPanel  from './components/InfoPanel'
import Header     from './components/Header'
import HintBadge  from './components/HintBadge'

/**
 * App — Root component.
 * Canvas renders the PBR 3D scene.
 * HTML overlay provides the HUD.
 */
export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#0c0a09' }}>

      {/* ══════════════════════════════════
          3D CANVAS  (gl: toneMapping + colorSpace for PBR accuracy)
      ══════════════════════════════════ */}
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ position: 'absolute', inset: 0 }}
        onClick={() => setSelectedRoom(null)}
      >
        {/* ── Isometric orthographic camera ── */}
        <OrthographicCamera
          makeDefault
          position={[12, 12, 12]}
          zoom={52}
          near={0.1}
          far={300}
        />

        {/* ── Orbit controls — locked below horizon ── */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minZoom={28}
          maxZoom={130}
          panSpeed={0.7}
          rotateSpeed={0.55}
          zoomSpeed={0.9}
          target={[0, 0, 0]}
          makeDefault
        />

        {/* ── Global ambient (soft fill) ── */}
        <ambientLight intensity={0.35} color="#c7d2fe" />

        {/* ── Sun / sunset directional light ── */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={2.5}
          color="#fff0dd"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
          shadow-bias={-0.0008}
          shadow-normalBias={0.04}
        />

        {/* ── Cool fill light from opposite side ── */}
        <directionalLight
          position={[-8, 6, -6]}
          intensity={0.6}
          color="#93c5fd"
        />

        {/* ── Warm point light inside the sala ── */}
        <pointLight
          position={[-3, 2.5, 0]}
          intensity={1.8}
          color="#fde68a"
          distance={8}
          decay={2}
          castShadow
          shadow-mapSize={[512, 512]}
        />

        {/* ── Point light in dormitorio ── */}
        <pointLight
          position={[3, 2.5, -2]}
          intensity={1.2}
          color="#fecaca"
          distance={6}
          decay={2}
        />

        {/* ── Full scene: floor plan + shadows + env HDRI ── */}
        <Suspense fallback={null}>
          <FloorPlan
            selectedRoom={selectedRoom}
            onRoomSelect={setSelectedRoom}
          />
        </Suspense>
      </Canvas>

      {/* CSS vignette overlay — cinematic dark border framing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.72) 100%)',
          zIndex: 5,
        }}
      />

      {/* ══════════════════════════════════
          HTML UI OVERLAY
      ══════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>

        {/* Header branding */}
        <Header subtitle="Simulador Arquitectónico PBR" />

        {/* Floating hint */}
        <HintBadge visible={!selectedRoom} />

        {/* Info panel */}
        <div className="absolute inset-y-0 right-0 pointer-events-none">
          <InfoPanel room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        </div>

        {/* Bottom-left legend */}
        <div className="absolute bottom-6 left-6 pointer-events-auto" style={{ zIndex: 30 }}>
          <RoomLegend />
        </div>

        {/* Bottom-right render quality badge */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
          <QualityBadge />
        </div>
      </div>
    </div>
  )
}

// ── Room colour legend ────────────────────────────────────────────────────────
function RoomLegend() {
  const items = [
    { label: 'Sala / Comedor',    color: '#a3a3a3', note: 'Microcemento' },
    { label: 'Dormitorio',        color: '#d4b483', note: 'Roble natural' },
    { label: 'Baño',              color: '#e8f0fe', note: 'Cerámica italiana' },
  ]
  return (
    <div
      className="flex flex-col gap-2 px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(12,10,9,0.78)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Materiales</p>
      {items.map(({ label, color, note }) => (
        <div key={label} className="flex items-center gap-2.5">
          <div
            className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}88`,
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          />
          <div className="leading-tight">
            <p className="text-slate-200 text-xs font-medium">{label}</p>
            <p className="text-slate-500 text-[10px]">{note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── PBR render quality badge ──────────────────────────────────────────────────
function QualityBadge() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg"
      style={{
        background: 'rgba(12,10,9,0.7)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-slate-400 text-xs font-medium">PBR · IBL · Vignette · Shadows</span>
    </div>
  )
}
