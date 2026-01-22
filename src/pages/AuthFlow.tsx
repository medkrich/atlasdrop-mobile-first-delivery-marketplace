import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Phone, ShieldCheck, Truck, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
type AuthStep = 'splash' | 'role-selection' | 'login' | 'otp';
export function AuthFlow() {
  const [step, setStep] = useState<AuthStep>('splash');
  const [role, setRole] = useState<'sender' | 'courier' | null>(null);
  const navigate = useNavigate();
  const handleRoleSelect = (selectedRole: 'sender' | 'courier') => {
    setRole(selectedRole);
    setStep('login');
  };
  const handleLogin = () => setStep('otp');
  const handleVerify = () => {
    if (role === 'sender') {
      localStorage.setItem('auth_role', 'sender');
      navigate('/user-dashboard');
    } else {
      localStorage.setItem('auth_role', 'courier');
      navigate('/courier-dashboard');
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-[#E55A1B] rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-orange-200">
              <Sparkles className="text-white w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">AtlasDrop</h1>
              <p className="text-slate-500">Logistics simplified for Morocco</p>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-[#FF6B35] hover:bg-[#E55A1B] text-white rounded-2xl h-14 text-lg font-semibold"
              onClick={() => setStep('role-selection')}
            >
              Get Started
            </Button>
          </motion.div>
        )}
        {step === 'role-selection' && (
          <motion.div
            key="role"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-sm space-y-6"
          >
            <h2 className="text-3xl font-bold">Choose your role</h2>
            <div className="grid gap-4">
              <button
                onClick={() => handleRoleSelect('sender')}
                className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:border-[#FF6B35] transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Package className="text-[#FF6B35]" />
                </div>
                <h3 className="text-xl font-bold">I am a Sender</h3>
                <p className="text-slate-500 text-sm">Ship goods across cities quickly</p>
              </button>
              <button
                onClick={() => handleRoleSelect('courier')}
                className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:border-[#004E89] transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Truck className="text-[#004E89]" />
                </div>
                <h3 className="text-xl font-bold">I am a Courier</h3>
                <p className="text-slate-500 text-sm">Deliver packages and earn money</p>
              </button>
            </div>
          </motion.div>
        )}
        {step === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-sm space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="text-slate-500">Enter your phone to continue</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+212</span>
                <Input className="pl-16 h-14 bg-slate-50 border-slate-100 rounded-2xl text-lg" placeholder="6 00 00 00 00" />
              </div>
              <Button 
                onClick={handleLogin}
                className="w-full h-14 bg-[#FF6B35] hover:bg-[#E55A1B] text-white rounded-2xl text-lg font-semibold"
              >
                Send OTP
              </Button>
            </div>
          </motion.div>
        )}
        {step === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm space-y-8 text-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Verification</h2>
              <p className="text-slate-500">We sent a 4-digit code to your phone</p>
            </div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-14 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  •
                </div>
              ))}
            </div>
            <Button 
              onClick={handleVerify}
              className="w-full h-14 bg-[#FF6B35] hover:bg-[#E55A1B] text-white rounded-2xl text-lg font-semibold"
            >
              Verify & Enter
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}