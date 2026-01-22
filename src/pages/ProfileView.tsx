import React from 'react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Wallet, Globe, LifeBuoy, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function ProfileView() {
  const user = useAppStore(s => s.user);
  const role = useAppStore(s => s.role);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth_role');
    navigate('/auth');
  };
  const ProfileItem = ({ icon: Icon, label, value, color = "text-slate-400" }: any) => (
    <div className="flex items-center justify-between py-4 group active:opacity-70 transition-opacity cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{label}</p>
          {value && <p className="text-xs text-slate-500">{value}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </div>
  );
  return (
    <MobileShell role={role === 'courier' ? 'courier' : 'sender'}>
      <div className="px-6 pt-12 pb-10 space-y-8">
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-slate-100 ring-4 ring-white shadow-xl">
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#FF6B35] text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <User size={14} />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-slate-500 font-medium">{user?.email}</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-100 h-9 px-6 text-xs font-bold">Edit Profile</Button>
        </header>
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Wallet & Payments</h2>
            <Card className="p-2 border-none shadow-sm bg-white rounded-[24px] divide-y divide-slate-50">
              <ProfileItem icon={Wallet} label="AtlasDrop Balance" value="1,240.00 MAD" color="text-green-500" />
              <ProfileItem icon={CreditCard} label="Payment Methods" value="Visa ending in 4242" color="text-blue-500" />
            </Card>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Preferences</h2>
            <Card className="p-2 border-none shadow-sm bg-white rounded-[24px] divide-y divide-slate-50">
              <ProfileItem icon={Globe} label="Language" value="English (US)" />
              <ProfileItem icon={Shield} label="Privacy & Security" />
            </Card>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Support</h2>
            <Card className="p-2 border-none shadow-sm bg-white rounded-[24px] divide-y divide-slate-50">
              <ProfileItem icon={LifeBuoy} label="Help Center" />
            </Card>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full h-14 rounded-2xl text-red-500 font-bold hover:bg-red-50 hover:text-red-600 transition-colors gap-2"
          >
            <LogOut size={20} />
            Log Out
          </Button>
          <p className="text-center text-[10px] text-slate-300 font-medium">AtlasDrop v1.2.0 • Made in Casablanca</p>
        </section>
      </div>
    </MobileShell>
  );
}