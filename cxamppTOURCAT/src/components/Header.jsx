import { motion } from 'framer-motion'
import { Building2, Award, Phone, MapPin } from 'lucide-react'

/**
 * Header — Fixed glassmorphism top bar.
 * Contains branding, property details, and contact action.
 */
export default function Header() {
  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 24 }}
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3.5 pointer-events-none"
      style={{ zIndex: 40 }}
    >
      {/* ── Left: Logo ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl pointer-events-auto"
        style={{
          background: 'rgba(8,6,24,0.75)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)',
            boxShadow: '0 4px 14px rgba(124,58,237,0.5)',
          }}
        >
          <Building2 size={19} color="white" />
        </div>

        <div className="leading-tight">
          <p
            className="text-white font-black tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem' }}
          >
            CAT Corporación
          </p>
          <p className="text-blue-300 text-[11px] font-medium">
            Recorrido Virtual Interactivo
          </p>
        </div>

        <div
          className="ml-1 flex items-center gap-1 px-2 py-1 rounded-full"
          style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}
        >
          <Award size={11} className="text-purple-300" />
          <span className="text-purple-200 text-[10px] font-semibold">Premium</span>
        </div>
      </div>

      {/* ── Centre: Property info pill ── */}
      <div
        className="hidden md:flex items-center gap-4 px-5 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(8,6,24,0.65)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-1.5 text-slate-300 text-xs">
          <MapPin size={13} className="text-blue-400" />
          <span>Departamento 4B · Torre Norte</span>
        </div>
        <div className="w-px h-4 bg-slate-600" />
        <div className="text-slate-300 text-xs">
          <span className="text-white font-bold">5 Espacios</span> · 118 m² total
        </div>
        <div className="w-px h-4 bg-slate-600" />
        <div className="text-slate-300 text-xs">
          Precio desde <span className="text-emerald-400 font-bold">$285,000 USD</span>
        </div>
      </div>

      {/* ── Right: Contact ── */}
      <button
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl pointer-events-auto transition-all duration-200"
        style={{
          background: 'rgba(8,6,24,0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
        }}
        onClick={() => alert('📞 CAT Corporación\nTeléfono: +52 55 1234-5678\nEmail: info@catcorporacion.mx\nHorario: Lun–Sáb 9:00–18:00')}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(8,6,24,0.75)')}
      >
        <Phone size={14} className="text-blue-400" />
        <span className="text-slate-200 text-xs font-semibold">Contáctanos</span>
      </button>
    </motion.header>
  )
}
