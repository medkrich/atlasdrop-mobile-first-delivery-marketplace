import { create } from 'zustand';
import { Delivery, MOCK_USER, AVAILABLE_JOBS } from './mock-data';
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'status' | 'payment' | 'system';
  read: boolean;
}
// Extend Delivery type for real-time simulation
export interface EnhancedDelivery extends Delivery {
  progress: number; // 0 to 100
  currentLocation?: { lat: number; lng: number };
}
interface AppState {
  user: any;
  role: 'sender' | 'courier' | null;
  marketplace: EnhancedDelivery[];
  myDeliveries: EnhancedDelivery[];
  notifications: Notification[];
  setRole: (role: 'sender' | 'courier') => void;
  addDelivery: (delivery: Omit<EnhancedDelivery, 'progress'>) => void;
  acceptDelivery: (id: string, courierName: string) => void;
  updateStatus: (id: string, status: EnhancedDelivery['status']) => void;
  updateProgress: (id: string, progress: number) => void;
  addNotification: (message: string, type: Notification['type']) => void;
}
export const useAppStore = create<AppState>((set) => ({
  user: MOCK_USER,
  role: (localStorage.getItem('auth_role') as 'sender' | 'courier') || null,
  marketplace: AVAILABLE_JOBS.map(j => ({ ...j, progress: 0 })),
  myDeliveries: [],
  notifications: [
    {
      id: 'n1',
      title: 'Welcome to AtlasDrop',
      message: 'Start shipping or delivering across Morocco today!',
      timestamp: new Date(),
      type: 'system',
      read: false,
    }
  ],
  setRole: (role) => {
    localStorage.setItem('auth_role', role);
    set({ role });
  },
  addDelivery: (delivery) => set((state) => ({
    marketplace: [{ ...delivery, progress: 0 }, ...state.marketplace],
    myDeliveries: [{ ...delivery, progress: 0 }, ...state.myDeliveries]
  })),
  acceptDelivery: (id, courierName) => set((state) => {
    const delivery = state.marketplace.find(d => d.id === id);
    if (!delivery) return state;
    const updated = { ...delivery, status: 'accepted' as const, courierName, progress: 5 };
    return {
      marketplace: state.marketplace.filter(d => d.id !== id),
      myDeliveries: [updated, ...state.myDeliveries.filter(d => d.id !== id)],
      notifications: [{
        id: Math.random().toString(),
        title: 'Order Accepted',
        message: `Courier ${courierName} has accepted your delivery #${id}`,
        timestamp: new Date(),
        type: 'status',
        read: false,
      }, ...state.notifications]
    };
  }),
  updateStatus: (id, status) => set((state) => {
    let progress = 0;
    if (status === 'accepted') progress = 10;
    if (status === 'picked_up') progress = 30;
    if (status === 'in_transit') progress = 60;
    if (status === 'delivered') progress = 100;
    return {
      myDeliveries: state.myDeliveries.map(d => d.id === id ? { ...d, status, progress: Math.max(d.progress, progress) } : d)
    };
  }),
  updateProgress: (id, progress) => set((state) => ({
    myDeliveries: state.myDeliveries.map(d => d.id === id ? { ...d, progress } : d)
  })),
  addNotification: (message, type) => set((state) => ({
    notifications: [{
      id: Math.random().toString(),
      title: 'Update',
      message,
      timestamp: new Date(),
      type,
      read: false,
    }, ...state.notifications]
  })),
}));