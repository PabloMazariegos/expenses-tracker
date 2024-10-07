import { BiBrain } from "react-icons/bi";
import { LuBrainCircuit } from "react-icons/lu";

export default function AIFunctions() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 px-8 sm:px-5 flex flex-col items-center justify-center text-center gap-6 bg-gradient-to-b from-primary-50 to-black">
			<div className="space-y-3">
				<div className="flex justify-center">
					<LuBrainCircuit className="text-8xl" />
				</div>
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
					AI-Powered Financial Insights
				</h2>
				<p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					Our advanced AI analyzes your spending patterns and provides personalized recommendations to improve
				</p>
			</div>
			<ul className="grid gap-2 py-4">
				<li className="flex items-center gap-2 text-primary">
					<BiBrain className="text-2xl" />
					<span>Expense optimization suggestions</span>
				</li>
				<li className="flex items-center gap-2 text-primary">
					<BiBrain className="text-2xl" />
					<span>Budget adjustments based on your goals</span>
				</li>
				<li className="flex items-center gap-2 text-primary">
					<BiBrain className="text-2xl" />
					<span>Potential savings opportunities</span>
				</li>
			</ul>
		</section>
	)
}
