import { motion } from 'framer-motion'
import { Building2, Award, Cpu, Phone } from 'lucide-react'

/**
 * Header — Glassmorphism top bar with branding and tech badge.
 *
 * Props:
 *   subtitle  string  — tagline shown beneath the company name
 */
export default function Header({ subtitle = 'Configurador 3D Inmobiliario' }) {
  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 20 }}
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-5 pb-4 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* ── Left: Logo block ── */}
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl pointer-events-auto"
        style={{
          background: 'rgba(15,10,35,0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)', boxShadow: '0 4px 16px rgba(124,58,237,0.5)' }}
        >
          <Building2 size={22} color="white" />
        </div>

        {/* Text */}
        <div className="leading-tight">
          <p
            className="text-white font-black tracking-tight leading-none"
            style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem' }}
          >
            CAT Corporación
          </p>
          <p className="text-blue-300 text-xs font-medium tracking-wide mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Premium chip */}
        <div
          className="ml-1 flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.45)' }}
        >
          <Award size={11} className="text-purple-300" />
          <span className="text-purple-200 text-[11px] font-semibold">Premium</span>
        </div>
      </div>

      {/* ── Right: Tech + contact ── */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* PBR tech badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
          style={{
            background: 'rgba(12,10,9,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Cpu size={14} className="text-emerald-400" />
          <span className="text-slate-300 text-xs font-medium">WebGL · PBR · IBL</span>
        </div>

        {/* Contact */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(12,10,9,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}
          onClick={() => alert('📞 CAT Corporación\nTeléfono: +52 55 1234-5678\nEmail: info@catcorporacion.mx')}
        >
          <Phone size={14} className="text-blue-400" />
          <span className="text-slate-200 text-xs font-medium">Contáctanos</span>
        </button>
      </div>
    </motion.header>
  )
}
