import React, { useState, useRef, useEffect } from 'react';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Paperclip, Smile, MoreHorizontal, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
interface ChatDrawerProps {
  deliveryId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ChatDrawer({ deliveryId, isOpen, onOpenChange }: ChatDrawerProps) {
  const [inputText, setInputText] = useState('');
  const chats = useAppStore(s => s.chats);
  const sendMessage = useAppStore(s => s.sendMessage);
  const startCall = useAppStore(s => s.startCall);
  const myDeliveries = useAppStore(s => s.myDeliveries);
  const user = useAppStore(s => s.user);
  const messages = chats[deliveryId] ?? [];
  const delivery = myDeliveries.find(d => d.id === deliveryId);
  const contactName = delivery?.courierName || 'Atlas Courier';
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);
  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(deliveryId, inputText);
      setInputText('');
    }
  };
  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] outline-none z-[70] h-[90vh] flex flex-col">
          <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto my-4 shrink-0" />
          {/* Header */}
          <header className="px-6 pb-4 border-b border-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 overflow-hidden ring-2 ring-orange-50">
                <img 
                  src={delivery?.courierName ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100" : "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100"} 
                  alt="Contact" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800">{contactName}</p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 rounded-xl text-[#FF6B35] bg-orange-50 hover:bg-orange-100"
                onClick={() => {
                  startCall(deliveryId, contactName);
                  onOpenChange(false);
                }}
              >
                <Phone size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-400">
                <MoreHorizontal size={20} />
              </Button>
            </div>
          </header>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full opacity-40 text-center space-y-2">
                <Send size={40} className="text-slate-300" />
                <p className="text-sm font-medium">Say hello to start the conversation!</p>
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const isMe = m.senderId === user?.id;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      isMe ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-3xl text-sm leading-relaxed shadow-sm",
                      isMe 
                        ? "bg-[#FF6B35] text-white rounded-tr-none" 
                        : "bg-white text-slate-800 rounded-tl-none"
                    )}>
                      {m.text}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 px-1">
                      {format(new Date(m.timestamp), 'HH:mm')}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* Footer Input */}
          <footer className="p-4 bg-white border-t border-slate-50 shrink-0 mb-safe">
            <div className="flex items-center gap-2 bg-slate-50 rounded-2xl p-1.5 pl-3 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <button className="text-slate-400 p-2 hover:text-[#FF6B35]">
                <Smile size={20} />
              </button>
              <Input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="bg-transparent border-none focus-visible:ring-0 shadow-none px-2 h-10"
              />
              <button className="text-slate-400 p-2 hover:text-[#FF6B35]">
                <Paperclip size={20} />
              </button>
              <Button
                onClick={handleSend}
                className="bg-[#FF6B35] hover:bg-[#E55A1B] text-white rounded-xl w-10 h-10 p-0 flex items-center justify-center shadow-lg shadow-orange-100 shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}