import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CalendarCheck, Ruler, Star, ChevronRight,
  Layers, Sparkles,
} from 'lucide-react'

/**
 * InfoPanel — Cinematic slide-in panel (right edge).
 * bg: dark glass with gradient accent top strip.
 * "Visualizar Materiales" button with animated gradient hover.
 *
 * Props:
 *   room     { id, name, area, icon, description, highlights } | null
 *   onClose  () => void
 */
export default function InfoPanel({ room, onClose }) {
  return (
    <AnimatePresence>
      {room && (
        <motion.aside
          key={room.id}
          initial={{ x: '115%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '115%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="absolute top-0 right-0 h-full w-[345px] max-w-[92vw] flex flex-col pointer-events-auto"
          style={{
            background: 'rgba(8,6,18,0.82)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            borderLeft: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '-24px 0 80px rgba(0,0,0,0.7)',
          }}
        >
          {/* ── Accent gradient bar ── */}
          <div
            className="h-[3px] w-full flex-shrink-0"
            style={{ background: 'linear-gradient(90deg, #1d4ed8 0%, #7c3aed 50%, #06b6d4 100%)' }}
          />

          {/* ── Header row ── */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none">{room.icon}</span>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">
                  Espacio seleccionado
                </p>
                <h2
                  className="text-white font-black leading-tight"
                  style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem' }}
                >
                  {room.name}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <X size={15} color="white" />
            </button>
          </div>

          <div className="mx-6 h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto info-panel-scroll px-6 py-5 flex flex-col gap-5">

            {/* Area card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}
            >
              <Ruler size={20} className="text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-blue-300 text-xs font-semibold mb-0.5">Superficie total</p>
                <p className="text-white font-black text-xl leading-none">{room.area}</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
            >
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Layers size={11} /> Descripción
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{room.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            >
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles size={11} /> Destacados
              </h3>
              <ul className="flex flex-col gap-2">
                {room.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <Star size={12} className="text-amber-400 flex-shrink-0" />
                    <span className="text-slate-200 text-sm flex-1">{h}</span>
                    <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Material badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}
              className="px-4 py-3 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-slate-500 text-xs">
                💡 Iluminación PBR + Environment HDRI activos
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Rota la cámara para apreciar los reflejos
              </p>
            </motion.div>
          </div>

          {/* ── Footer CTA ── */}
          <div className="px-6 py-5 flex flex-col gap-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Primary CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.27 }}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-sm"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                boxShadow: '0 10px 36px rgba(37,99,235,0.4)',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '0.02em',
              }}
              onClick={() =>
                alert(`¡Gracias! Un asesor de CAT Corporación te contactará para agendar una visita al "${room.name}".`)
              }
            >
              <CalendarCheck size={17} />
              Agendar Mi Visita
            </motion.button>

            {/* Secondary "Visualizar Materiales" */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'white',
                fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(124,58,237,0.2) 100%)'
                e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
              onClick={() => alert(`Materiales PBR del "${room.name}":\n• Suelo: ${room.highlights[0]}\n• Iluminación IBL con preset "apartment"\n• SoftShadows activas (samples=20)`)}
            >
              <Sparkles size={15} />
              Visualizar Materiales
            </motion.button>

            <p className="text-center text-slate-600 text-[11px]">
              Sin compromiso · Respuesta en &lt;24h
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
