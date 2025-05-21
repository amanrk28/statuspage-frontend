import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isLocalhost } from './utils/is-local'

const queryClient = new QueryClient()

export const App = () => {
  const isLocal = isLocalhost();

  return (
    <QueryClientProvider client={queryClient}>
      {isLocal && (
        <ReactQueryDevtools initialIsOpen={false} position='bottom' />
      )}
      <div />
    </QueryClientProvider>
  )
}
