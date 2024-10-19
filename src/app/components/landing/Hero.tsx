'use client'

import { Button } from "@nextui-org/react";
import { FaArrowDown } from 'react-icons/fa6'
import { useRouter } from "next/navigation";

export default function Hero() {
	const router = useRouter()

	return (
		<section className="w-full h-screen -mt-10 px-8 flex flex-col items-center justify-center text-center gap-6">
			<h1 className="w-fit text-4xl md:text-7xl font-bold tracking-tighter text-pretty">
				Your Intelligent {" "}
				<span className="font-extrabold bg-gradient-to-r from-primary to-cyan-700 text-transparent bg-clip-text"> 
					ExpenseTracker
				</span> 
			</h1>

			<p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
				Harness the power of AI to optimize your spending, track expenses, and improve your financial health.
			</p>

			<div className="space-x-4">
				<Button 
					color="primary" 
					variant="ghost" 
					radius="full" 
					className="text-white"
					onClick={() => router.push('/dashboard')}
				>
					Get Started
				</Button>
				<Button 
					variant="light" 
					endContent={<FaArrowDown />} 
					onClick={() => router.push('#features')}
				>
					Learn more
				</Button>
			</div>
		</section>
	)
}
