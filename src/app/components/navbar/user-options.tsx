'use client'

import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserSessionContext } from '@/app/providers'

export default function UserOptions() {  
	const userSession = useUserSessionContext()
	const avatarUrl = userSession?.user_metadata.avatar_url || null
	const emailAddress = userSession?.email || 'n/a'

	const router = useRouter()

	async function handleSignOut () {
		const supabase = createClient()
		await supabase.auth.signOut()
		router.push('/login');
	}

	return (
		<>
			{
				userSession &&
      <Dropdown placement='bottom-end'>
      	<DropdownTrigger>
      		<Avatar
      			isBordered
      			as='button'
      			className='transition-transform'
      			color='secondary'
      			name='Jason Hughes'
      			size='sm'
      			src={avatarUrl}
      		/>
      	</DropdownTrigger>
      	<DropdownMenu aria-label='Profile Actions' variant='flat'>
      		<DropdownItem key='profile' className='h-14 gap-2'>
      			<p className='font-semibold'>Signed in as</p>
      			<p className='font-normal'>{emailAddress}</p>
      		</DropdownItem>
      		<DropdownItem key='configurations'>Configurations</DropdownItem>
      		<DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
      		<DropdownItem key='logout' color='danger' onClick={handleSignOut}>
            Log Out
      		</DropdownItem>
      	</DropdownMenu>
      </Dropdown>
			}
		</>
	)
}
