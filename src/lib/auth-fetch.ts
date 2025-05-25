// src/lib/authFetch.ts
import { useAuth0 } from "@auth0/auth0-react";

export const useAuthFetch = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = await getAccessTokenSilently();

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "X-Tenant-ID": user?.org_id, // org_id from Auth0
        "Content-Type": "application/json",
      },
    });
  };

  return fetchWithAuth;
};
