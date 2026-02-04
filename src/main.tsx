import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { AuthFlow } from '@/pages/AuthFlow';
import { UserHome } from '@/pages/UserHome';
import { CourierHome } from '@/pages/CourierHome';
import { TrackingView } from '@/pages/TrackingView';
import { OrdersView } from '@/pages/OrdersView';
import { NotificationsView } from '@/pages/NotificationsView';
import { ProfileView } from '@/pages/ProfileView';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { CallOverlay } from '@/components/communication/CallOverlay';
import { useAppStore } from '@/lib/store';
const queryClient = new QueryClient();
// Simulation Root Component to drive global state updates
export function GlobalSimulationProvider({ children }: { children: React.ReactNode }) {
  const tick = useAppStore(s => s.tick);
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 5000); // Progress tick every 5 seconds
    return () => clearInterval(interval);
  }, [tick]);
  return (
    <>
      {children}
      <CallOverlay />
    </>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/auth",
    element: <AuthFlow />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/user-dashboard",
    element: <UserHome />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/courier-dashboard",
    element: <CourierHome />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/tracking/:id",
    element: <TrackingView />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/orders",
    element: <OrdersView />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/notifications",
    element: <NotificationsView />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <GlobalSimulationProvider>
          <RouterProvider router={router} />
        </GlobalSimulationProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
)