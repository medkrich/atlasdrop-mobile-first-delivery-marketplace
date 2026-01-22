import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
interface TrackingMapProps {
  progress: number;
  pickup: string;
  destination: string;
}
export function TrackingMap({ progress, pickup, destination }: TrackingMapProps) {
  // SVG path coordinates (normalized 0-100)
  const pathData = "M 20 80 Q 50 20 80 50";
  return (
    <div className="relative w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-inner">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-12">
        {/* Route Path Shadow */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-slate-100"
          strokeLinecap="round"
        />
        {/* Active Route Path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="3"
          strokeDasharray="100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - progress }}
          strokeLinecap="round"
          transition={{ type: "spring", stiffness: 50 }}
        />
        {/* Pickup Pin */}
        <g transform="translate(20, 80)">
          <circle r="4" fill="white" stroke="#CBD5E1" strokeWidth="2" />
        </g>
        {/* Destination Pin */}
        <g transform="translate(80, 50)">
          <motion.circle 
            r="8" 
            fill="#FF6B35" 
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            opacity="0.2"
          />
          <circle r="4" fill="#FF6B35" />
        </g>
        {/* Courier Indicator */}
        <motion.g
          initial={false}
          animate={{ 
            offsetDistance: `${progress}%`,
          }}
          style={{
            offsetPath: `path("${pathData}")`,
            offsetRotate: "auto"
          }}
          transition={{ type: "spring", stiffness: 30 }}
        >
          <foreignObject x="-12" y="-12" width="24" height="24">
            <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Navigation size={12} className="text-white fill-current rotate-45" />
            </div>
          </foreignObject>
        </motion.g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">From</p>
          <p className="text-xs font-bold truncate max-w-[100px]">{pickup.split(',')[0]}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm text-right">
          <p className="text-[10px] font-bold text-[#FF6B35] uppercase">To</p>
          <p className="text-xs font-bold truncate max-w-[100px]">{destination.split(',')[0]}</p>
        </div>
      </div>
    </div>
  );
}