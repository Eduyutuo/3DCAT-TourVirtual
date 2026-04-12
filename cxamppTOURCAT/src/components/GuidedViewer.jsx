import React, { useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import '@photo-sphere-viewer/core/index.css';
import { ChevronLeft, ChevronRight, X, LayoutDashboard } from 'lucide-react';
import Header from './Header';

export default function GuidedViewer({ route, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRoom = route[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === route.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-['Inter']">
      
      {/* 360 Viewer Canvas */}
      {/* Notice that we change the key when currentRoom changes so the viewer can completely remount or we could just pass src and hope react-photo-sphere-viewer updates gracefully (it usually does) */}
      <ReactPhotoSphereViewer
        key={currentRoom.id + currentIndex} // Forzamos recarga sencilla para este MVP, o se podría manejar con referencias
        src={currentRoom.panorama}
        height="100vh"
        width="100%"
        navbar={['zoom', 'move', 'fullscreen']}
        defaultPitch={0}
      />

      {/* Top Header Overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <Header />
      </div>

      {/* HUD Info Box (Top Center) */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-3">
           <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold border border-blue-500/30">
             {currentIndex + 1}
           </div>
           <div>
             <p className="text-slate-300 text-[10px] font-bold uppercase tracking-wider leading-none mb-0.5">Habitación Actual</p>
             <p className="text-white text-sm font-semibold font-['Outfit'] leading-none">{currentRoom.name}</p>
           </div>
           <div className="pl-3 ml-3 border-l border-white/10 text-slate-400 text-xs font-medium">
             de {route.length}
           </div>
        </div>
      </div>

      {/* Exit Button (Top Right, if Header doesn't conflict) */}
      <div className="absolute top-24 right-5 z-50 pointer-events-auto">
        <button 
          onClick={onExit}
          className="bg-black/60 hover:bg-red-500/20 hover:border-red-500/50 backdrop-blur-md border border-white/10 text-white p-3 rounded-full shadow-lg transition-all"
          title="Salir al Creador de Rutas"
        >
          <LayoutDashboard size={20} />
        </button>
      </div>

      {/* HUD Navigation Controls (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-4">
        
        {/* Prev Button */}
        <button 
          onClick={handlePrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            isFirst 
              ? 'bg-black/40 text-slate-500 border border-white/5 cursor-not-allowed backdrop-blur-md'
              : 'bg-black/70 hover:bg-blue-600 border border-white/10 text-white backdrop-blur-md shadow-2xl hover:shadow-blue-500/30'
          }`}
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          disabled={isLast}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            isLast 
              ? 'bg-black/40 text-slate-500 border border-white/5 cursor-not-allowed backdrop-blur-md'
              : 'bg-black/70 hover:bg-blue-600 border border-white/10 text-white backdrop-blur-md shadow-2xl hover:shadow-blue-500/30'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight size={20} />
        </button>

      </div>
    </div>
  );
}
