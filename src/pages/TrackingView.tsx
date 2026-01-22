import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ACTIVE_DELIVERY } from '@/lib/mock-data';
import { ChevronLeft, Phone, MessageSquare, ShieldCheck, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer } from 'vaul';
export function TrackingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden flex flex-col items-center">
      {/* Fake Map Background */}
      <div className="absolute inset-0 bg-[#f8f9fa] w-full max-w-md">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
        {/* Simplified Route Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] bg-[#FF6B35] rotate-[-20deg]" />
        {/* Pickup Pin */}
        <div className="absolute top-[55%] left-[30%] w-6 h-6 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-2 h-2 bg-slate-300 rounded-full" />
        </div>
        {/* Courier Pin */}
        <div className="absolute top-[48%] left-[45%] w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-bounce">
          <MapIcon size={18} className="text-white" />
        </div>
        {/* Destination Pin */}
        <div className="absolute top-[45%] left-[65%] w-6 h-6 bg-[#FF6B35] border-2 border-white rounded-full shadow-lg" />
      </div>
      <header className="absolute top-0 w-full max-w-md p-6 flex items-center gap-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <ChevronLeft />
        </button>
        <div className="bg-white px-5 h-12 rounded-2xl flex items-center shadow-lg flex-1">
          <p className="font-bold text-sm">Tracking {id}</p>
        </div>
      </header>
      <Drawer.Root open={true} modal={false} dismissible={false}>
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] outline-none z-50">
            <div className="p-6 space-y-6">
              <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto" />
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">8 mins away</h3>
                  <p className="text-slate-400 font-medium">Youssef is delivering your items</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-slate-100 bg-slate-50">
                    <MessageSquare size={18} className="text-[#FF6B35]" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-slate-100 bg-slate-50">
                    <Phone size={18} className="text-[#FF6B35]" />
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Secure Delivery</p>
                  <p className="text-xs text-slate-500">Share your 4-digit code at drop-off</p>
                </div>
                <div className="ml-auto">
                  <p className="text-xl font-mono font-black text-slate-800">4912</p>
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2" />
                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Pickup</p>
                    <p className="font-medium text-slate-700">{ACTIVE_DELIVERY.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B35] mt-2" />
                  <div>
                    <p className="text-xs text-[#FF6B35] font-bold uppercase tracking-tighter">Destination</p>
                    <p className="font-medium text-slate-700">{ACTIVE_DELIVERY.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}