'use client'

import { Button } from '@nextui-org/button'
import { FaGithub } from 'react-icons/fa6'
import { signInWithGithub } from '@/utils/auth-providers/actions'


export default function Login() {
	return (
		<div className='w-full flex flex-col items-center justify-center text-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
			<p className='text-4xl md:text-5xl font-bold tracking-tighter'> 
				Login 
			</p>
			<Button  
				startContent={<FaGithub/>}
				onClick={signInWithGithub}
			>
        Sign In with Github
			</Button>
		</div>
	)
}
