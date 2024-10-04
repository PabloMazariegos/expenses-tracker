import { createClient } from './server'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
	const supabase = createClient()
	const userResponse = await supabase.auth.getUser()

	const pathName = request.nextUrl.pathname

	if(!userResponse.data.user && pathName.startsWith('/dashboard')){
		const url = request.nextUrl.clone()
		url.pathname = '/login'

		return NextResponse.redirect(url)
	}

	if (userResponse.data.user && pathName === '/login') {
		const url = request.nextUrl.clone();
		url.pathname = '/dashboard';
    
		return NextResponse.redirect(url);
	}

	return NextResponse.next({ request })

}
