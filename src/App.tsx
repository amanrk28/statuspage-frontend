import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isLocalhost } from './utils/is-local'
import { Outlet } from 'react-router-dom'
import { Auth0ProviderWithHistory } from './providers/auth-provider'
import { useSetupAPIAuth } from './hooks/useApiSetup'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppContent = () => {
  useSetupAPIAuth();
  const isLocal = isLocalhost();

  return (
    <QueryClientProvider client={queryClient}>
      {isLocal && (
        <ReactQueryDevtools initialIsOpen={false} position='bottom' />
      )}
      <Outlet />
    </QueryClientProvider>
  )
}

export const App = () => {
  return (
    <Auth0ProviderWithHistory>
      <AppContent />
    </Auth0ProviderWithHistory>
  )
}
