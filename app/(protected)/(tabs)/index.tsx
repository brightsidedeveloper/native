import { Link } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

export default function index() {
  return (
    <SafeAreaView>
      <Text>(tabs)index</Text>
      <Link href="/(protected)/other">
        <Text>Go to other</Text>
      </Link>
    </SafeAreaView>
  )
}
