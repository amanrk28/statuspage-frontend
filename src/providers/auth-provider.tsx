import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export const Auth0ProviderWithHistory = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      domain={domain || ''}
      clientId={clientId || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation='localstorage'
      onRedirectCallback={() => {
        navigate("/services")
      }}
    >
      {children}
    </Auth0Provider>
  );
};

