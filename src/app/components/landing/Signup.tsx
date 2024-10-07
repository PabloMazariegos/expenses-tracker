import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Signup() {
	const router = useRouter()

	return (
		<section className="w-full py-12 md:py-24 lg:py-32 px-8 sm:px-5 flex flex-col items-center justify-center text-center gap-6">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
					Ready to Optimize Your Finances?
				</h2>
				<p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
					Take control of your finances and boost your financial health with {" "}
					<span className="font-extrabold bg-gradient-to-r from-primary to-cyan-700 text-transparent bg-clip-text">
						ExpenseTracker
					</span>
				</p>
			</div>
			<div className="w-full max-w-sm space-y-2">
				<Button 
					color="primary"
					variant="shadow"
					className="w-full" 
					size="lg"
					onClick={() => router.push('/dashboard')}
				>
					Sign Up for Free
				</Button>
				
				<p className="text-xs text-gray-400">
					No credit card required. Start your 30-day free trial today.
				</p>
			</div>
		</section>
	)
}
