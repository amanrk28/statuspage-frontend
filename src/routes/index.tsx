import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/pages/DashboardLayout";
import { ProtectedRoute } from "./protected-route";
import { PublicStatusPage } from "@/pages/PublicStatusPage";
import { App } from "@/App";
import { IncidentRoutes } from "./incident-routes";
import { ServiceRoutes } from "./service-routes";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "status/:orgSlug",
        caseSensitive: true,
        element: <PublicStatusPage />,
      },
      // {
      //   path: "app",
      //   element: (
      //     <ProtectedRoute>
      //       <DashboardLayout />
      //     </ProtectedRoute>),
      //   children: [
      //     { path: "services/*", element: <ServiceRoutes /> },
      //     {
      //       path: "incidents/*", element: <IncidentRoutes />,
      //     },
      //   ],
      // },
      {
        path: "services/*",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "*", element: <ServiceRoutes /> }
        ],
      },
      {
        path: "incidents/*",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "*", element: <IncidentRoutes /> }
        ],
      }
    ]
  },
]);
