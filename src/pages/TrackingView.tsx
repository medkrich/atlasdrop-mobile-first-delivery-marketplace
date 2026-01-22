import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer } from 'vaul';
import { useAppStore } from '@/lib/store';
import { TrackingMap } from '@/components/delivery/TrackingMap';
export function TrackingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const myDeliveries = useAppStore(s => s.myDeliveries);
  const marketplace = useAppStore(s => s.marketplace);
  const updateStatus = useAppStore(s => s.updateStatus);
  const userRole = useAppStore(s => s.role);
  const delivery = [...myDeliveries, ...marketplace].find(d => d.id === id);
  useEffect(() => {
    if (!delivery) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [delivery, navigate]);
  if (!delivery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Locating shipment...</p>
      </div>
    );
  }
  const isCourier = userRole === 'courier';
  const canProgress = isCourier && delivery.status !== 'delivered';
  const handleStatusUpdate = () => {
    if (delivery.status === 'accepted') updateStatus(delivery.id, 'picked_up');
    else if (delivery.status === 'picked_up') updateStatus(delivery.id, 'in_transit');
    else if (delivery.status === 'in_transit') updateStatus(delivery.id, 'delivered');
  };
  const getActionButtonText = () => {
    if (delivery.status === 'accepted') return 'I have Arrived at Pickup';
    if (delivery.status === 'picked_up') return 'Package Picked Up';
    if (delivery.status === 'in_transit') return 'Confirm Delivery';
    return 'Completed';
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md h-screen relative flex flex-col overflow-hidden">
        <header className="absolute top-0 w-full p-6 flex items-center gap-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform border border-slate-100"
          >
            <ChevronLeft />
          </button>
          <div className="bg-white px-5 h-12 rounded-2xl flex items-center shadow-lg flex-1 border border-slate-100">
            <p className="font-bold text-sm">Shipment {delivery.id}</p>
          </div>
        </header>
        <div className="flex-1 pt-24 px-6">
          <TrackingMap 
            progress={delivery.progress} 
            pickup={delivery.pickup} 
            destination={delivery.destination} 
          />
        </div>
        <Drawer.Root open={true} modal={false} dismissible={false}>
          <Drawer.Portal>
            <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] outline-none z-50">
              <div className="p-6 space-y-6">
                <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto" />
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">
                      {delivery.status === 'delivered' ? 'Delivered!' : 'In Progress'}
                    </h3>
                    <p className="text-slate-400 font-medium">
                      {isCourier ? 'Navigate to destination' : `${delivery.courierName || 'Searching...'} is on the way`}
                    </p>
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
                {delivery.status !== 'delivered' && (
                  <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-4 border border-orange-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <ShieldCheck className="text-[#FF6B35]" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase text-[#FF6B35] tracking-tight">Delivery Code</p>
                      <p className="text-lg font-mono font-black text-slate-800">4912</p>
                    </div>
                    <p className="text-[10px] text-slate-400 max-w-[80px] leading-tight">Share this with the courier at drop-off</p>
                  </div>
                )}
                {canProgress && (
                  <Button 
                    onClick={handleStatusUpdate}
                    className="w-full h-14 bg-[#004E89] hover:bg-[#003d6d] rounded-2xl text-lg font-bold shadow-lg"
                  >
                    {getActionButtonText()}
                  </Button>
                )}
                {delivery.status === 'delivered' && (
                  <div className="flex flex-col items-center py-4 text-center space-y-2">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="text-green-500" />
                    </div>
                    <p className="font-bold">Trip Completed</p>
                    <Button variant="ghost" className="text-[#FF6B35]" onClick={() => navigate('/')}>Back to Dashboard</Button>
                  </div>
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}