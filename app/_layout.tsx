import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Adjust retry options
      refetchOnWindowFocus: false, // Adjust based on preference
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot initialRouteName="(protected)/(tabs)" />
    </QueryClientProvider>
  )
}
