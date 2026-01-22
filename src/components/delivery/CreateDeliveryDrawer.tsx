import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, CreditCard, ChevronRight, Box, Utensils, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
export function CreateDeliveryDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const addDelivery = useAppStore(s => s.addDelivery);
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    type: 'Box',
    price: 35
  });
  const handleCreate = () => {
    const newDelivery = {
      id: `AD-${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'searching' as const,
      pickup: formData.pickup || 'Maarif, Casablanca',
      destination: formData.destination || 'Gauthier, Casablanca',
      price: formData.price,
      distance: '4.2 km',
    };
    addDelivery(newDelivery);
    setStep(4);
    setTimeout(() => {
      setOpen(false);
      setStep(1);
    }, 2000);
  };
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] outline-none z-50 p-6">
          <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto mb-8" />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Where's it going?</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <Input 
                      placeholder="Pickup address" 
                      className="pl-12 h-14 bg-slate-50 border-none rounded-2xl"
                      value={formData.pickup}
                      onChange={e => setFormData(p => ({ ...p, pickup: e.target.value }))}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6B35]" size={18} />
                    <Input 
                      placeholder="Destination address" 
                      className="pl-12 h-14 bg-slate-50 border-none rounded-2xl"
                      value={formData.destination}
                      onChange={e => setFormData(p => ({ ...p, destination: e.target.value }))}
                    />
                  </div>
                </div>
                <Button className="w-full h-14 bg-[#FF6B35] rounded-2xl text-lg font-bold" onClick={() => setStep(2)}>
                  Next Step <ChevronRight className="ml-2" />
                </Button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">What are you sending?</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Box', icon: Box, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Food', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Docs', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' }
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => setFormData(p => ({ ...p, type: item.label }))}
                      className={`p-4 rounded-3xl flex flex-col items-center gap-2 border-2 transition-all ${formData.type === item.label ? 'border-[#FF6B35] bg-white shadow-lg' : 'border-transparent bg-slate-50'}`}
                    >
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                        <item.icon className={item.color} size={20} />
                      </div>
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
                <Button className="w-full h-14 bg-[#FF6B35] rounded-2xl text-lg font-bold" onClick={() => setStep(3)}>
                  View Estimate
                </Button>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-slate-50 rounded-[32px] space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 font-medium">Estimated Price</p>
                    <p className="text-3xl font-black text-[#FF6B35]">{formData.price} MAD</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <CreditCard size={16} />
                    <span>Pay with Cash or Wallet</span>
                  </div>
                </div>
                <Button className="w-full h-14 bg-[#FF6B35] rounded-2xl text-lg font-bold" onClick={handleCreate}>
                  Confirm Request
                </Button>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Request Sent!</h2>
                  <p className="text-slate-500">Finding a courier nearby...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}