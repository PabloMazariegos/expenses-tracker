import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request){
  const { searchParams, origin } = new URL(request.url)

  const authCode = searchParams.get('code')
  const nextUrl = searchParams.get('next') ?? '/'

  if(!authCode){
    console.error('No authentication code received')
    return NextResponse.redirect(`${origin}/auth/error`) //TODO: create a page to authentication error message
  }

  const supabase = createClient()
  const authTokenResponse = await supabase.auth.exchangeCodeForSession(authCode)

  if(authTokenResponse?.error){
    console.error('Error exchanging authentication code')
    return NextResponse.redirect(`${origin}/auth/error`) //TODO: create a page to authentication error message
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'

  if(isLocalEnv){
    return NextResponse.redirect(`${origin}${nextUrl}`)
  }
  
  if(forwardedHost){
    return NextResponse.redirect(`https://${forwardedHost}${nextUrl}`)
  }

  return NextResponse.redirect(`${origin}${nextUrl}`)
}