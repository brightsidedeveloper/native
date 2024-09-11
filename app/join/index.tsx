import { Alert, Platform, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import supabase from '@/api/Supabase'
import { useQueryClient } from '@tanstack/react-query'
import Session from '@/api/queries/Session'

export default function Auth() {
  const qc = useQueryClient()
  if (Platform.OS === 'ios')
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {/* <Button title="Sign in with Github" onPress={signInWithGithub} /> */}
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const { error } = await supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })
                if (error) Alert.alert(error?.message)
                if (!error) qc.invalidateQueries({ queryKey: Session.queryOptions.queryKey })
              } else {
                throw new Error('No identityToken.')
              }
            } catch (e: any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      </View>
    )
  return <>{/* Implement Android Auth options. */}</>
}
