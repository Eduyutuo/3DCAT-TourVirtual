import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { availableRooms } from '../data/rooms';
import { Plus, X, ArrowRight, Play, Map } from 'lucide-react';
import Header from './Header';

export default function RoutePlanner({ onStartTour }) {
  const [route, setRoute] = useState([]);

  const addRoom = (room) => {
    // Add room to the route sequentially
    setRoute([...route, room]);
  };

  const removeRoom = (indexToRemove) => {
    setRoute(route.filter((_, index) => index !== indexToRemove));
  };

  const handleStart = () => {
    if (route.length > 0) {
      onStartTour(route);
    }
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col font-['Inter']">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-40 pointer-events-none">
        <Header />
      </div>

      {/* Main Content Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row h-full pt-20">
        
        {/* Left Column: Available Rooms Catalog */}
        <div className="lg:w-1/2 p-8 lg:pl-16 lg:pr-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-3 font-['Outfit'] tracking-tight">Crea tu Ruta de Visita</h1>
            <p className="text-slate-400 text-lg">
              Selecciona las habitaciones que deseas visitar en este recorrido virtual guiado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addRoom(room)}
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-blue-500/50 transition-colors bg-slate-900/50"
              >
                {/* Background Image Preview */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundImage: `url(${room.panorama})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between">
                  <h3 className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">
                    {room.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    <Plus size={18} color="white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Built Route */}
        <div className="lg:w-1/2 p-8 lg:pr-16 lg:pl-8 flex flex-col h-full bg-slate-900/30 border-l border-white/5 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30">
                <Map size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white font-['Outfit']">Tu Recorrido</h2>
            </div>
            
            <span className="text-slate-400 text-sm font-medium">
              {route.length} {route.length === 1 ? 'Habitación' : 'Habitaciones'}
            </span>
          </div>

          {/* Route List */}
          <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
            {route.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-8 border-2 border-dashed border-slate-700/50 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <Plus size={24} className="text-slate-500" />
                </div>
                <p className="text-slate-400 font-medium font-['Outfit'] text-lg mb-2">Comienza a construir</p>
                <p className="text-slate-500 text-sm">Escoge una habitación del catálogo izquierdo para añadirla a tu ruta.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {route.map((room, index) => (
                    <motion.div
                      key={`${room.id}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-4 bg-slate-800/60 border border-slate-700 p-4 rounded-2xl"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                        <span className="text-slate-300 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{room.name}</p>
                      </div>
                      <button 
                        onClick={() => removeRoom(index)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                        title="Quitar"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={handleStart}
              disabled={route.length === 0}
              className={`w-full py-4 rounded-xl font-bold font-['Outfit'] text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                route.length > 0 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Iniciar Recorrido
              <Play size={20} className={route.length > 0 ? "fill-current" : ""} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
