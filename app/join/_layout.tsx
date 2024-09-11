import Auth from '@/api/queries/Auth'
import { useQuery } from '@tanstack/react-query'
import { Slot, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Layout() {
  const router = useRouter()
  const { data, isLoading } = useQuery(Auth.queryOptions)

  useEffect(() => {
    if (!isLoading && data) {
      router.replace('/(protected)/(tabs)')
    }
  }, [isLoading])

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

  return <Slot />
}
