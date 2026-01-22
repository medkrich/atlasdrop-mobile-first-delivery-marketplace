import React from 'react';
import { MobileShell } from '@/components/layout/MobileShell';
import { Plus, Search, Navigation, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { CreateDeliveryDrawer } from '@/components/delivery/CreateDeliveryDrawer';
export function UserHome() {
  const user = useAppStore(s => s.user);
  const myDeliveries = useAppStore(s => s.myDeliveries);
  const activeShipment = myDeliveries.find(d => d.status !== 'delivered');
  return (
    <MobileShell role="sender">
      <div className="px-6 pt-12 pb-6 space-y-8">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Ahlan, {user?.name.split(' ')[0]}!</p>
            <h1 className="text-3xl font-bold">Where to next?</h1>
          </div>
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-[#FF6B35]/10">
            <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </header>
        <section className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Track your shipment..."
            className="w-full h-14 bg-slate-100/50 border-none rounded-2xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#FF6B35]/20 transition-all"
          />
        </section>
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Active Shipment</h2>
            <Link to="/orders" className="text-sm font-semibold text-[#FF6B35]">View all</Link>
          </div>
          {activeShipment ? (
            <Link to={`/tracking/${activeShipment.id}`}>
              <Card className="p-5 border-none shadow-soft bg-white rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Navigation className="text-[#FF6B35] size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold capitalize">{activeShipment.status.replace('_', ' ')}</p>
                      <p className="text-xs text-slate-500">Update incoming...</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-mono">{activeShipment.id}</p>
                  </div>
                </div>
                <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Pickup</p>
                    <p className="text-sm font-medium line-clamp-1">{activeShipment.pickup}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#FF6B35] border-2 border-white" />
                    <p className="text-xs text-[#FF6B35] uppercase font-bold tracking-tighter">Destination</p>
                    <p className="text-sm font-medium line-clamp-1">{activeShipment.destination}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <Package className="text-slate-300" size={32} />
              </div>
              <div>
                <p className="font-bold text-slate-800">No active shipments</p>
                <p className="text-sm text-slate-400">Your current orders will appear here</p>
              </div>
              <CreateDeliveryDrawer>
                <Button className="bg-[#FF6B35] rounded-xl font-bold">New Delivery</Button>
              </CreateDeliveryDrawer>
            </div>
          )}
        </section>
        <section className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-32 rounded-3xl flex-col gap-3 bg-white border-slate-100 hover:bg-slate-50">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Navigation className="text-blue-500 size-5" />
            </div>
            <span className="font-bold">History</span>
          </Button>
          <Button variant="outline" className="h-32 rounded-3xl flex-col gap-3 bg-white border-slate-100 hover:bg-slate-50">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Plus className="text-purple-500 size-5" />
            </div>
            <span className="font-bold">Address Book</span>
          </Button>
        </section>
      </div>
      <CreateDeliveryDrawer>
        <button className="fixed bottom-24 right-6 w-16 h-16 bg-[#FF6B35] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
          <Plus size={32} />
        </button>
      </CreateDeliveryDrawer>
    </MobileShell>
  );
}