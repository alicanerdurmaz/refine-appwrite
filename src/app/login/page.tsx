import { AuthPage } from '@components/auth-page'
import { authProviderServer } from '@providers/auth-provider'
import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default async function Login() {
  const data = await getData()

  if (data.authenticated) {
    redirect(data?.redirectTo || '/')
  }

  return <AuthPage type='login' />
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check()

  return {
    authenticated,
    redirectTo,
    error,
  }
}
