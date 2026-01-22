import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
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
const queryClient = new QueryClient();
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
    path: "/tracking/:id",
    element: <TrackingView />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)