import { motion, AnimatePresence } from 'framer-motion'
import { Navigation2, ArrowLeft, Home } from 'lucide-react'

/**
 * NavigationBar — Bottom-left control bar.
 * Shows a "Back" button when history has previous nodes, and
 * a "Home" button to jump back to the sala.
 *
 * Props:
 *   canGoBack    boolean
 *   onBack       () => void
 *   onHome       () => void
 *   currentTitle string
 */
export default function NavigationBar({ canGoBack, onBack, onHome, currentTitle }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 24 }}
      className="absolute bottom-6 left-5 flex items-center gap-2 pointer-events-auto"
      style={{ zIndex: 30 }}
    >
      {/* Back button */}
      <AnimatePresence>
        {canGoBack && (
          <motion.button
            key="back"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'rgba(8,6,24,0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(8,6,24,0.8)')}
          >
            <ArrowLeft size={15} />
            Volver
          </motion.button>
        )}
      </AnimatePresence>

      {/* Home button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHome}
        className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
        style={{
          background: 'rgba(8,6,24,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(8,6,24,0.8)')}
        aria-label="Ir al inicio"
      >
        <Home size={15} color="white" />
      </motion.button>

      {/* Current location indicator */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(8,6,24,0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Navigation2 size={12} className="text-blue-400" />
        <span className="text-slate-300 text-xs font-medium">{currentTitle}</span>
      </div>
    </motion.div>
  )
}
