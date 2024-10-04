'use client'

import { createClient } from '@/utils/supabase/client'
import {NextUIProvider} from '@nextui-org/react'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

const SessionContext = createContext<Session | null>(null)

export function Providers({children}: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null)

	function sessionSuscription(event:AuthChangeEvent, session:Session|null){
		if(event === 'SIGNED_OUT'){
			setSession(null)

		}else if(session){
			setSession(session)
		}
	}

	useEffect(() => {
		const supabase = createClient()
		const {data: { subscription }} = supabase.auth.onAuthStateChange(sessionSuscription)

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return (
		<NextUIProvider>
			<SessionContext.Provider value={session}>
				{children}
			</SessionContext.Provider>
		</NextUIProvider>
	)
}

export function useSessionContext(){
	return useContext(SessionContext)
}

export function useUserSessionContext(){
	const session = useContext(SessionContext)
	return session?.user
}
