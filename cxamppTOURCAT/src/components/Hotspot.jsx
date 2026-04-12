import { motion } from 'framer-motion'

/**
 * Hotspot — A single point-and-click navigation button overlaid on the scene.
 *
 * Props:
 *   hotspot   { target, top, left, label, icon }
 *   onClick   callback()
 *   disabled  boolean — suppressed during transition
 */
export default function Hotspot({ hotspot, onClick, disabled }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      onClick={disabled ? undefined : onClick}
      aria-label={`Ir a: ${hotspot.label}`}
      style={{ top: hotspot.top, left: hotspot.left }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 cursor-pointer"
    >
      {/* ── Outer pulse ring ── */}
      <div className="relative flex items-center justify-center">
        {/* Animated pulse rings */}
        <span
          className="hotspot-ring absolute w-12 h-12 rounded-full"
          style={{ background: 'rgba(255,255,255,0.25)', animationDelay: '0s' }}
        />
        <span
          className="hotspot-ring absolute w-12 h-12 rounded-full"
          style={{ background: 'rgba(255,255,255,0.15)', animationDelay: '0.7s' }}
        />

        {/* ── Core dot ── */}
        <div
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.95) 100%)',
            boxShadow: '0 0 0 3px rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.35)',
          }}
        >
          <span className="text-lg leading-none">{hotspot.icon}</span>
        </div>
      </div>

      {/* ── Label pill ── */}
      <div
        className="px-3 py-1 rounded-full text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap"
        style={{
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        {hotspot.icon} {hotspot.label}
      </div>
    </motion.button>
  )
}
