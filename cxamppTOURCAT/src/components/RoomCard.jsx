import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, CalendarCheck, Star } from 'lucide-react'

/**
 * RoomCard — Slide-up info card shown at the bottom of the screen
 * when a room is active. Displays title, area, description, and CTA.
 *
 * Props:
 *   node     current tourData node
 *   onClose  () => void
 */
export default function RoomCard({ node, onClose }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.25 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 pointer-events-auto"
        style={{ zIndex: 30 }}
      >
        <div
          className="relative flex flex-col gap-3 px-6 py-5 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,6,18,0.82)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          }}
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #1d4ed8, #7c3aed, #06b6d4)' }}
          />

          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">{node.ambiance}</span>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">
                  Área actual
                </p>
                <h2
                  className="text-white font-black text-lg leading-tight"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {node.title}
                </h2>
              </div>
            </div>

            {/* Area badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.3)' }}
            >
              <Ruler size={13} className="text-blue-400" />
              <span className="text-blue-200 text-xs font-bold">{node.area}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed">{node.details}</p>

          {/* Footer CTA */}
          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white text-sm"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
                fontFamily: 'Outfit, sans-serif',
              }}
              onClick={() =>
                alert('¡Gracias! Un asesor de CAT Corporación te contactará para agendar tu visita presencial.')
              }
            >
              <CalendarCheck size={15} />
              Agendar Visita
            </motion.button>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              aria-label="Cerrar tarjeta"
            >
              <X size={15} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
