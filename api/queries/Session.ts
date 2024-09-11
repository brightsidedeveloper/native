import { queryOptions } from '@tanstack/react-query'
import supabase from '../Supabase'

export default class Session {
  static queryOptions = queryOptions({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession()
      return data.session
    },
  })
}
