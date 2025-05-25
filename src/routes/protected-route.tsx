import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect(); // auto redirect to login
    return null;
  }

  return <>{children}</>;
};
