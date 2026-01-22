import React from 'react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Bell, Package, Info, Wallet, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export function NotificationsView() {
  const role = useAppStore(s => s.role);
  const notifications = useAppStore(s => s.notifications);
  const getIcon = (type: string) => {
    switch (type) {
      case 'status': return <Package className="text-blue-500" size={20} />;
      case 'payment': return <Wallet className="text-green-500" size={20} />;
      default: return <Info className="text-orange-500" size={20} />;
    }
  };
  return (
    <MobileShell role={role || 'sender'}>
      <div className="px-6 pt-12 pb-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Alerts</h1>
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            <Bell size={20} />
          </div>
        </header>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <Card key={notif.id} className="p-4 border-none shadow-sm bg-white rounded-2xl flex gap-4 active:bg-slate-50 transition-colors">
                <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm">{notif.title}</p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed text-pretty">{notif.message}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center opacity-50 space-y-2">
              <p className="font-bold">All caught up!</p>
              <p className="text-sm">No new notifications for you</p>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}