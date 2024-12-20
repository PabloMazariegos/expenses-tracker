import { BiBarChart, BiCreditCard, BiPieChart } from "react-icons/bi";
import Feature from "./Feature";

export default function KeyFeatures() {
	return (
		<section id="features" className="w-full py-16 md:py-24 lg:py-32 px-2 sm:px-5 flex flex-col items-center justify-center text-center gap-6">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12">
					Key features
				</h2>

				<div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
					<Feature 
						icon={<BiBarChart size={40}/>} 
						title="Comprenhensive Dashboard"
						description="Get a bird&apos;s-eye view of your accounts and credit card expenses with our intuitive dashboard."
					/>

					<Feature 
						icon={<BiCreditCard size={40} />} 
						title="Credit Card Period Manager"
						description="Easily manage and track your credit card expenses for each billing period."
					/>

					<Feature 
						icon={<BiPieChart size={40} />} 
						title="Visual Expense Reports"
						description="Easily manage and track your credit card expenses for each billing period."
					/>
				</div>
			</div>	
		</section>
	)
}
