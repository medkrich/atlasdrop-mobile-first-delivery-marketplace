import { create } from 'zustand';
import { Delivery, MOCK_USER, AVAILABLE_JOBS } from './mock-data';
interface AppState {
  user: any;
  role: 'sender' | 'courier' | null;
  marketplace: Delivery[];
  myDeliveries: Delivery[];
  notifications: Notification[];
  setRole: (role: 'sender' | 'courier') => void;
  addDelivery: (delivery: Delivery) => void;
  acceptDelivery: (id: string, courierName: string) => void;
  updateStatus: (id: string, status: Delivery['status']) => void;
  addNotification: (message: string, type: Notification['type']) => void;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'status' | 'payment' | 'system';
  read: boolean;
}
export const useAppStore = create<AppState>((set) => ({
  user: MOCK_USER,
  role: (localStorage.getItem('auth_role') as 'sender' | 'courier') || null,
  marketplace: AVAILABLE_JOBS,
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
    marketplace: [delivery, ...state.marketplace],
    myDeliveries: [delivery, ...state.myDeliveries]
  })),
  acceptDelivery: (id, courierName) => set((state) => {
    const delivery = state.marketplace.find(d => d.id === id);
    if (!delivery) return state;
    const updated = { ...delivery, status: 'accepted' as const, courierName };
    return {
      marketplace: state.marketplace.filter(d => d.id !== id),
      myDeliveries: [updated, ...state.myDeliveries],
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
  updateStatus: (id, status) => set((state) => ({
    myDeliveries: state.myDeliveries.map(d => d.id === id ? { ...d, status } : d)
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