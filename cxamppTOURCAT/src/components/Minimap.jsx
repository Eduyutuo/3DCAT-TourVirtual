import { motion } from 'framer-motion'
import { nodeOrder, nodeShort } from '../tourData'

/**
 * Minimap — Top-right breadcrumb showing the apartment node graph.
 * Visited nodes are highlighted; current node is pulsing.
 *
 * Props:
 *   currentId   id of the active node
 *   visited     Set of visited node ids
 *   onNavigate  callback(nodeId) — allows jumping to visited rooms
 */
export default function Minimap({ currentId, visited, onNavigate }) {
  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 22 }}
      className="absolute top-20 right-5 flex flex-col gap-1.5"
      style={{ zIndex: 25 }}
    >
      {/* Title */}
      <p
        className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right"
      >
        Mapa del inmueble
      </p>

      {nodeOrder.map((id) => {
        const isCurrent = id === currentId
        const isVisited = visited.has(id)

        return (
          <button
            key={id}
            onClick={() => isVisited && !isCurrent && onNavigate(id)}
            disabled={isCurrent || !isVisited}
            aria-label={`Ir a ${nodeShort[id]}`}
            className="flex items-center gap-2 group transition-all duration-200"
            style={{ cursor: isVisited && !isCurrent ? 'pointer' : 'default' }}
          >
            {/* Dot */}
            <div
              className={`relative flex-shrink-0 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'scale-125'
                  : isVisited
                    ? 'opacity-80'
                    : 'opacity-25'
              }`}
              style={{
                background: isCurrent
                  ? 'linear-gradient(135deg, #60a5fa, #a78bfa)'
                  : isVisited
                    ? '#64748b'
                    : '#1e293b',
                boxShadow: isCurrent
                  ? '0 0 8px rgba(96,165,250,0.8)'
                  : 'none',
              }}
            >
              {isCurrent && (
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: 'rgba(96,165,250,0.5)' }}
                />
              )}
            </div>

            {/* Label pill */}
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all duration-200 ${
                isCurrent
                  ? 'text-white'
                  : isVisited
                    ? 'text-slate-300 group-hover:text-white'
                    : 'text-slate-600'
              }`}
              style={{
                background: isCurrent
                  ? 'rgba(37,99,235,0.35)'
                  : 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                border: isCurrent
                  ? '1px solid rgba(96,165,250,0.4)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {nodeShort[id]}
            </span>
          </button>
        )
      })}
    </motion.div>
  )
}
