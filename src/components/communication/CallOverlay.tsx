import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, Volume2, Video, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function CallOverlay() {
  const activeCall = useAppStore(s => s.activeCall);
  const endCall = useAppStore(s => s.endCall);
  const acceptCall = useAppStore(s => s.acceptCall);
  if (!activeCall) return null;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-between py-24 text-white overflow-hidden"
      >
        {/* Background Blur */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=800" 
            alt="Blur" 
            className="w-full h-full object-cover blur-3xl scale-110"
          />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <div className="w-32 h-32 rounded-full mx-auto relative">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={activeCall.status === 'ringing' ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128" 
              className="w-full h-full rounded-full border-4 border-white/10 shadow-2xl relative z-10"
              alt="Avatar"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">{activeCall.contactName}</h2>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">
              {activeCall.status === 'ringing' ? 'AtlasDrop Audio Call...' : `Connected • ${formatTime(activeCall.duration)}`}
            </p>
          </div>
        </div>
        {/* Waves Simulation (Connected Only) */}
        {activeCall.status === 'connected' && (
          <div className="relative z-10 flex items-center justify-center gap-1 h-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <motion.div
                key={i}
                className="w-1.5 bg-[#FF6B35] rounded-full"
                animate={{ height: [8, 24, 12, 32, 10] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.6 + (i * 0.1), 
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        )}
        <div className="relative z-10 w-full max-w-xs space-y-12">
          {activeCall.status === 'connected' && (
            <div className="grid grid-cols-3 gap-8">
              <button className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mic size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400">Mute</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Volume2 size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400">Speaker</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Video size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400">Video</span>
              </button>
            </div>
          )}
          <div className="flex justify-around items-center">
            {activeCall.status === 'ringing' ? (
              <>
                <button 
                  onClick={endCall}
                  className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-xl shadow-red-500/20 active:scale-90 transition-transform"
                >
                  <PhoneOff size={32} />
                </button>
                <button 
                  onClick={acceptCall}
                  className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/20 active:scale-90 transition-transform animate-bounce"
                >
                  <Phone size={32} />
                </button>
              </>
            ) : (
              <button 
                onClick={endCall}
                className="w-20 h-20 rounded-full bg-red-500 mx-auto flex items-center justify-center shadow-xl shadow-red-500/20 active:scale-90 transition-transform"
              >
                <PhoneOff size={32} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}