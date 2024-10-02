'use client'

import { Button } from '@nextui-org/button'
import { FaGithub } from "react-icons/fa6"
import { signInWithGithub } from '@/utils/auth-providers/actions'


export default function Login() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p className="text-4xl font-bold"> Login </p>
      <Button  
        startContent={<FaGithub/>}
        onClick={signInWithGithub}
      >
        Sign In with Github
      </Button>
    </div>
  )
}