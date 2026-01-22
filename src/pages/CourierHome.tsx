import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { StatCard, JobTicket } from '@/components/ui/shared-cards';
import { Wallet, Navigation, Clock } from 'lucide-react';
export function CourierHome() {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const marketplace = useAppStore(s => s.marketplace);
  const acceptDelivery = useAppStore(s => s.acceptDelivery);
  const handleAccept = (id: string) => {
    acceptDelivery(id, user?.name || 'Courier');
    navigate(`/tracking/${id}`);
  };
  return (
    <MobileShell role="courier">
      <div className="px-6 pt-12 pb-6 space-y-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100">
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Marhaba, {user?.name.split(' ')[0]}</p>
              <div className="flex items-center gap-2">
                <span className={isOnline ? "text-green-500" : "text-slate-400"}>●</span>
                <span className="font-bold">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </header>
        <section className="grid grid-cols-2 gap-4">
          <StatCard
            title="Today's Earnings"
            value="450 MAD"
            icon={<Wallet className="text-green-500" size={18} />}
          />
          <StatCard
            title="Total Trips"
            value="12"
            icon={<Navigation className="text-blue-500" size={18} />}
          />
        </section>
        {!isOnline ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
            <Clock size={48} className="text-slate-300" />
            <div>
              <p className="text-xl font-bold">You're Offline</p>
              <p className="text-slate-500">Go online to start receiving orders</p>
            </div>
          </div>
        ) : (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Nearby Requests</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                {marketplace.length} New
              </span>
            </div>
            <div className="space-y-4">
              {marketplace.length > 0 ? (
                marketplace.map((job) => (
                  <JobTicket 
                    key={job.id} 
                    job={job} 
                    onAccept={() => handleAccept(job.id)}
                  />
                ))
              ) : (
                <div className="py-20 text-center space-y-2">
                  <p className="font-bold text-slate-400">Searching for jobs...</p>
                  <p className="text-sm text-slate-300">New requests will appear here</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </MobileShell>
  );
}