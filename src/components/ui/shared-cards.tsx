import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight, TrendingUp } from 'lucide-react';
import { Delivery } from '@/lib/mock-data';
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}
export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="p-4 border-none shadow-soft bg-white rounded-3xl space-y-3">
      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
export function JobTicket({ job }: { job: Delivery }) {
  return (
    <Card className="p-5 border-none shadow-soft bg-white rounded-3xl space-y-4 group active:scale-[0.98] transition-all">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#FF6B35]">{job.price} MAD</p>
          <p className="text-xs text-slate-400 font-medium">{job.distance} • Express</p>
        </div>
        <Button size="sm" className="bg-[#004E89] hover:bg-[#003d6d] rounded-xl px-4">
          Accept
        </Button>
      </div>
      <div className="space-y-3 pt-2 border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <p className="text-sm text-slate-600 truncate">{job.pickup}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
          <p className="text-sm font-medium text-slate-800 truncate">{job.destination}</p>
        </div>
      </div>
    </Card>
  );
}