import { motion, AnimatePresence } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'

/**
 * HintBadge — Floating instruction badge shown when no room is selected.
 * Appears at the bottom-center of the screen with a gentle float animation.
 */
export default function HintBadge({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-10 left-1/2 pointer-events-none floating-badge"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: 'rgba(15,23,42,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Animated pulse icon */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: 'rgba(37,99,235,0.5)' }}
              />
              <div
                className="relative flex items-center justify-center w-7 h-7 rounded-full"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}
              >
                <MousePointerClick size={14} color="white" />
              </div>
            </div>

            <span
              className="text-slate-200 text-sm font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Haz clic en una habitación para ver los detalles
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
