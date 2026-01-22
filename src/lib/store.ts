import { create } from 'zustand';
import { Delivery, MOCK_USER, AVAILABLE_JOBS, MOCK_APPLICATIONS, CourierApplication } from './mock-data';
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'status' | 'payment' | 'system';
  read: boolean;
}
export interface EnhancedDelivery extends Delivery {
  progress: number;
  currentLocation?: { lat: number; lng: number };
}
interface AppState {
  user: any;
  role: 'sender' | 'courier' | 'admin' | null;
  marketplace: EnhancedDelivery[];
  myDeliveries: EnhancedDelivery[];
  notifications: Notification[];
  courierApplications: CourierApplication[];
  setRole: (role: 'sender' | 'courier' | 'admin') => void;
  addDelivery: (delivery: Omit<EnhancedDelivery, 'progress'>) => void;
  acceptDelivery: (id: string, courierName: string) => void;
  updateStatus: (id: string, status: EnhancedDelivery['status']) => void;
  updateProgress: (id: string, progress: number) => void;
  addNotification: (message: string, type: Notification['type'], title?: string) => void;
  verifyCourier: (id: string, status: 'approved' | 'rejected') => void;
  tick: () => void;
}
export const useAppStore = create<AppState>((set) => ({
  user: MOCK_USER,
  role: (localStorage.getItem('auth_role') as 'sender' | 'courier' | 'admin') || null,
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
  courierApplications: MOCK_APPLICATIONS,
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
  addNotification: (message, type, title = 'Update') => set((state) => ({
    notifications: [{
      id: Math.random().toString(),
      title,
      message,
      timestamp: new Date(),
      type,
      read: false,
    }, ...state.notifications]
  })),
  verifyCourier: (id, status) => set((state) => ({
    courierApplications: state.courierApplications.map(app => 
      app.id === id ? { ...app, status: status === 'approved' ? 'verified' : 'rejected' as any } : app
    )
  })),
  tick: () => set((state) => {
    const nextDeliveries = state.myDeliveries.map(d => {
      if (d.status === 'in_transit' && d.progress < 100) {
        const increment = Math.floor(Math.random() * 3) + 1;
        const newProgress = Math.min(d.progress + increment, 100);
        const newStatus = newProgress === 100 ? 'delivered' : d.status;
        return { ...d, progress: newProgress, status: newStatus as any };
      }
      return d;
    });
    const newlyDelivered = nextDeliveries.filter((d, i) => 
      d.status === 'delivered' && state.myDeliveries[i].status !== 'delivered'
    );
    const newNotifications = [...state.notifications];
    newlyDelivered.forEach(d => {
      newNotifications.unshift({
        id: Math.random().toString(),
        title: 'Package Delivered',
        message: `Shipment #${d.id} has reached its destination safely.`,
        timestamp: new Date(),
        type: 'status',
        read: false,
      });
    });
    return {
      myDeliveries: nextDeliveries,
      notifications: newNotifications
    };
  }),
}));