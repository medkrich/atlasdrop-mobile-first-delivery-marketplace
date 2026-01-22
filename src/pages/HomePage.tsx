import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('auth_role');
    if (!role) {
      navigate('/auth');
    } else if (role === 'sender') {
      navigate('/user-dashboard');
    } else if (role === 'courier') {
      navigate('/courier-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/auth');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}