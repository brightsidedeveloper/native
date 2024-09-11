import { createClient } from '@supabase/supabase-js'

// services/secureStore.ts
import * as SecureStore from 'expo-secure-store'
import { AppState } from 'react-native'

async function saveSecureItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

async function getSecureItem(key: string) {
  return await SecureStore.getItemAsync(key)
}

async function deleteSecureItem(key: string) {
  await SecureStore.deleteItemAsync(key)
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => getSecureItem(key),
  setItem: (key: string, value: string) => saveSecureItem(key, value),
  removeItem: (key: string) => deleteSecureItem(key),
}

const supabase = createClient(
  'https://qggxdfauiisbstftmfjx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZ3hkZmF1aWlzYnN0ZnRtZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5ODI5MDEsImV4cCI6MjAzNjU1ODkwMX0.rBhRz0T6QFwHHZLLxKNRSSsdhl7d7f1o3zjoPR-tkgQ',
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default supabase
