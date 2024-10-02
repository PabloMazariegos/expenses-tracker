import { createClient } from "../supabase/client"

export async function signInWithGithub() {
  const supabase = createClient()

  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/api/v1/auth/callback`
    }
  })
}