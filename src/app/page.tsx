'use client'

import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation';
import LandingNavBar from './components/navbar/landing-navbar'

export default function Home() {
  const router = useRouter()

  function goToDashboard() {
    router.push('/dashboard')
  }

  return (
    <>
      <LandingNavBar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        This will be a landing page
        <Button onClick={goToDashboard}>Go to dashboard</Button>
      </div>
    </>
  );
}
