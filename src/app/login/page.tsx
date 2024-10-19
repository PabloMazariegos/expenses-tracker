'use client'

import { Button } from '@nextui-org/button'
import { Divider, Input } from '@nextui-org/react'
import { FaGithub } from 'react-icons/fa6'
import { signInWithGithub } from '@/utils/auth-providers/actions'

export default function Login() {
	return (
		<div className='w-full flex flex-col items-center justify-center min-h-screen px-8 -mt-16'>
			<div className='w-full md:max-w-md flex flex-col gap-2'>
				<p className='text-3xl md:text-4xl tracking-tight'>Welcome back</p>
				<p className='text-gray-400 tracking-tight'>Sign In to your account</p>

				<div className='w-full flex flex-col gap-3 mt-8'>
					<Button
						variant='flat'
						startContent={<FaGithub />}
						onClick={signInWithGithub}
					>
						Sign In with Github
					</Button>

					<Divider className='mt-5 mb-3'></Divider>

					<Input
						type='email'
						label='Email'
						variant='bordered'
						labelPlacement='outside'
						placeholder='you@email.com'
						className='mb-3'
					></Input>

					<Input
						label='Password'
						variant='bordered'
						type='password'
						labelPlacement='outside'
						placeholder=' '
					/>

					<Button color='primary' className='mt-5'>
						Sign In
					</Button>
				</div>
			</div>
		</div>
	)
}
