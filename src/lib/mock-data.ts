export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'sender' | 'courier' | 'admin';
  avatar?: string;
}
export interface Delivery {
  id: string;
  status: 'searching' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered';
  pickup: string;
  destination: string;
  price: number;
  distance: string;
  courierName?: string;
  eta?: string;
}
export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Ahmed Mansouri',
  email: 'ahmed@sme-morocco.ma',
  role: 'sender',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
export const MOCK_COURIER: UserProfile = {
  id: 'c1',
  name: 'Youssef Alami',
  email: 'youssef@atlasdrop.com',
  role: 'courier',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
export const AVAILABLE_JOBS: Delivery[] = [
  { id: 'd1', status: 'searching', pickup: 'Maarif, Casablanca', destination: 'Gauthier, Casablanca', price: 25, distance: '3.2 km' },
  { id: 'd2', status: 'searching', pickup: 'Technopark', destination: 'Ain Sebaa', price: 45, distance: '12.4 km' },
  { id: 'd3', status: 'searching', pickup: 'Boulevard Anfa', destination: 'California', price: 35, distance: '8.1 km' },
];
export const ACTIVE_DELIVERY: Delivery = {
  id: 'track-123',
  status: 'in_transit',
  pickup: 'Casablanca Port',
  destination: 'Hassan II Mosque Area',
  price: 30,
  distance: '2.5 km',
  courierName: 'Youssef Alami',
  eta: '8 mins',
};
export const EARNINGS_HISTORY = [
  { day: 'Mon', amount: 320 },
  { day: 'Tue', amount: 450 },
  { day: 'Wed', amount: 210 },
  { day: 'Thu', amount: 580 },
  { day: 'Fri', amount: 640 },
  { day: 'Sat', amount: 490 },
  { day: 'Sun', amount: 150 },
];