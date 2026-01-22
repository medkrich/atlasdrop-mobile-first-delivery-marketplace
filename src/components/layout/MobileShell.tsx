import React from 'react';
import { Home, Package, MapPin, User, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Drawer } from 'vaul';
interface MobileShellProps {
  children: React.ReactNode;
  role?: 'sender' | 'courier';
}
export function MobileShell({ children, role = 'sender' }: MobileShellProps) {
  const location = useLocation();
  const navItems = role === 'sender' 
    ? [
        { icon: Home, label: 'Home', path: '/user-dashboard' },
        { icon: Package, label: 'Orders', path: '/orders' },
        { icon: Bell, label: 'Alerts', path: '/notifications' },
        { icon: User, label: 'Profile', path: '/profile' },
      ]
    : [
        { icon: MapPin, label: 'Jobs', path: '/courier-dashboard' },
        { icon: Package, label: 'Active', path: '/tracking/active' },
        { icon: Bell, label: 'Alerts', path: '/notifications' },
        { icon: User, label: 'Profile', path: '/profile' },
      ];
  return (
    <Drawer.Root shouldScaleBackground>
      <div className="min-h-screen bg-slate-50 flex flex-col items-center">
        <main className="w-full max-w-md bg-background min-h-screen shadow-2xl relative pb-20 flex flex-col">
          {children}
          <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-slate-100 flex justify-around items-center py-3 px-2 z-50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? "text-[#FF6B35]" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </main>
      </div>
    </Drawer.Root>
  );
}