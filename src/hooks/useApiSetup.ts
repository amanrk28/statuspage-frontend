import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { API } from '../api';

export const useSetupAPIAuth = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    // Request interceptor to add auth token
    const requestInterceptor = API.interceptors.request.use(
      async (config) => {
        if (isAuthenticated) {
          try {
            const token = await getAccessTokenSilently({ detailedResponse: true });
            config.headers.Authorization = `Bearer ${token.id_token}`;
            if (user?.org_id) {
              config.headers['X-Tenant-ID'] = user.org_id;
            }
            if (user?.sub) {
              config.headers['X-User-ID'] = user.sub;
            }
          } catch (error) {
            console.error('Error getting access token:', error);
            // Fallback to localStorage token if Auth0 fails
            const fallbackToken = localStorage.getItem('token');
            if (fallbackToken) {
              config.headers.Authorization = `Bearer ${fallbackToken}`;
            }
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiry
    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && isAuthenticated) {
          try {
            // Try to refresh the token and retry the request
            const token = await getAccessTokenSilently({ detailedResponse: true });
            error.config.headers.Authorization = `Bearer ${token.id_token}`;
            if (user?.org_id) {
              error.config.headers['X-Tenant-ID'] = user.org_id;
            }
            return API.request(error.config);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, [user, isAuthenticated, getAccessTokenSilently]);
};