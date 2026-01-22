import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/lib/store';
import { PLATFORM_METRICS } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ChatDrawer } from '@/components/communication/ChatDrawer';
import {
  TrendingUp,
  Users,
  Package,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
export function AdminDashboard() {
  const applications = useAppStore(s => s.courierApplications);
  const verifyCourier = useAppStore(s => s.verifyCourier);
  const notifications = useAppStore(s => s.notifications);
  const pendingApps = applications.filter(app => app.docsStatus === 'pending');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const StatBox = ({ title, value, sub, icon: Icon, color }: any) => (
    <Card className="p-6 border-none shadow-soft bg-white rounded-3xl relative overflow-hidden group">
      <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-110", color)} />
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-xs font-bold text-green-500">{sub}</p>
        </div>
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", color.replace('bg-', 'bg-').replace('-500', '-50'))}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
      </div>
    </Card>
  );
  return (
    <AppLayout container contentClassName="bg-slate-50/50 min-h-screen">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Control Center</h1>
            <p className="text-slate-500 font-medium">Monitoring AtlasDrop platform health in real-time.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
               <Button variant="ghost" className="rounded-2xl bg-white border-slate-200 h-12 w-12 p-0 shadow-sm relative">
                  <Bell size={20} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                  )}
               </Button>
            </div>
            <Button className="rounded-2xl bg-[#FF6B35] hover:bg-[#E55A1B] text-white shadow-lg shadow-orange-100 px-6 h-12 font-bold">System Settings</Button>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBox title="Revenue" value={PLATFORM_METRICS.totalRevenue} sub={PLATFORM_METRICS.revenueGrowth} icon={TrendingUp} color="bg-orange-500" />
          <StatBox title="Active Jobs" value={PLATFORM_METRICS.activeJobs} sub="Current deliveries" icon={Package} color="bg-blue-500" />
          <StatBox title="Pending Verification" value={pendingApps.length} sub="Courier queue" icon={ShieldAlert} color="bg-purple-500" />
          <StatBox title="New Users" value="1,420" sub={PLATFORM_METRICS.userGrowth} icon={Users} color="bg-green-500" />
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-8 border-none shadow-soft bg-white rounded-[32px] space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Platform Volume</h2>
                <p className="text-sm text-slate-400">Total delivery requests per day</p>
              </div>
              <div className="flex gap-2">
                {['7D', '1M', '1Y'].map(t => (
                  <button key={t} className={cn("px-3 py-1 text-xs font-bold rounded-lg", t === '7D' ? "bg-orange-50 text-orange-600" : "text-slate-400 hover:bg-slate-50")}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <AnalyticsCharts />
            </div>
          </Card>
          <Card className="p-8 border-none shadow-soft bg-white rounded-[32px] space-y-6">
            <h2 className="text-2xl font-bold">Verification Queue</h2>
            <div className="space-y-4">
              {pendingApps.length > 0 ? (
                pendingApps.map(app => (
                  <div key={app.id} className="p-4 bg-slate-50 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{app.name}</p>
                        <p className="text-xs text-slate-400">{app.city} • {app.vehicle}</p>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-slate-400 border border-slate-100 uppercase">Pending</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => verifyCourier(app.id, 'approved')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl h-9 text-xs font-bold"
                      >
                        <CheckCircle size={14} className="mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => verifyCourier(app.id, 'rejected')}
                        className="flex-1 border-red-100 text-red-500 hover:bg-red-50 rounded-xl h-9 text-xs font-bold"
                      >
                        <XCircle size={14} className="mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center space-y-2 opacity-50">
                  <CheckCircle className="mx-auto text-green-500" size={32} />
                  <p className="text-sm font-bold">All clear!</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        <Card className="p-8 border-none shadow-soft bg-white rounded-[32px] space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">High-Value Shipments</h2>
            <Button variant="ghost" className="text-[#FF6B35] font-bold text-sm">View Archive</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="pb-4">Tracking ID</th>
                  <th className="pb-4">Destination</th>
                  <th className="pb-4">Value</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3].map((i) => {
                  const tid = `track-12${i}`;
                  return (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-mono font-bold text-sm">#{tid}</td>
                      <td className="py-4">
                        <p className="text-sm font-bold">Casablanca Port</p>
                        <p className="text-xs text-slate-400">Arrived 2 hours ago</p>
                      </td>
                      <td className="py-4 text-sm font-bold">850 MAD</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-black uppercase">In Transit</span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <Button 
                          onClick={() => setActiveChatId(tid)}
                          size="icon" 
                          variant="ghost" 
                          className="rounded-xl text-[#FF6B35] bg-orange-50 hover:bg-orange-100"
                        >
                          <MessageSquare size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-xl"><ShieldAlert size={16} /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {activeChatId && (
        <ChatDrawer 
          deliveryId={activeChatId} 
          isOpen={!!activeChatId} 
          onOpenChange={(open) => !open && setActiveChatId(null)} 
        />
      )}
    </AppLayout>
  );
}