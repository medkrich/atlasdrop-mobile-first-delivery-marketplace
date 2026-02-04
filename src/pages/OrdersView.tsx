import React, { useState } from 'react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Package, ChevronRight, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChatDrawer } from '@/components/communication/ChatDrawer';
import { Button } from '@/components/ui/button';
export function OrdersView() {
  const role = useAppStore(s => s.role);
  const myDeliveries = useAppStore(s => s.myDeliveries);
  const chats = useAppStore(s => s.chats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const active = myDeliveries.filter(d => d.status !== 'delivered');
  const history = myDeliveries.filter(d => d.status === 'delivered');
  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      searching: 'bg-orange-100 text-orange-600',
      accepted: 'bg-blue-100 text-blue-600',
      in_transit: 'bg-indigo-100 text-indigo-600',
      delivered: 'bg-green-100 text-green-600',
    };
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", colors[status])}>
        {status.replace('_', ' ')}
      </span>
    );
  };
  return (
    <MobileShell role={role === 'courier' ? 'courier' : 'sender'}>
      <div className="px-6 pt-12 pb-6 flex-1 flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Tabs defaultValue="active" className="w-full flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl h-12">
            <TabsTrigger value="active" className="rounded-xl font-bold data-[state=active]:bg-white">Active</TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl font-bold data-[state=active]:bg-white">History</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="flex-1 mt-6 space-y-4">
            {active.length > 0 ? (
              active.map(d => (
                <div key={d.id} className="group relative">
                  <Link to={`/tracking/${d.id}`}>
                    <Card className="p-4 border-none shadow-sm bg-white rounded-2xl flex items-center gap-4 active:scale-95 transition-all">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        <Package className="text-[#FF6B35]" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-sm truncate pr-8">{d.destination}</p>
                          <p className="text-xs font-mono text-slate-400">#{d.id}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={d.status} />
                          <span className="text-[10px] text-slate-400 font-medium">{d.price} MAD</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                    </Card>
                  </Link>
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedChatId(d.id);
                    }}
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl text-slate-400 hover:text-[#FF6B35] z-10"
                  >
                    <MessageSquare size={18} />
                    {(chats[d.id]?.length || 0) > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full" />
                    )}
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                <Clock size={40} className="text-slate-300 mb-2" />
                <p className="font-bold">No active orders</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history" className="flex-1 mt-6 space-y-4">
             {history.length > 0 ? (
              history.map(d => (
                 <Card key={d.id} className="p-4 border-none shadow-sm bg-slate-50/50 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Package className="text-slate-300" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate text-slate-600">{d.destination}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={d.status} />
                        <span className="text-[10px] text-slate-400 font-medium">Delivered Oct 12</span>
                      </div>
                    </div>
                  </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                <p className="font-bold">No order history yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {selectedChatId && (
        <ChatDrawer 
          deliveryId={selectedChatId} 
          isOpen={!!selectedChatId} 
          onOpenChange={(open) => !open && setSelectedChatId(null)} 
        />
      )}
    </MobileShell>
  );
}