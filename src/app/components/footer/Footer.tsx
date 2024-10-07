import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#006FEE]/20">
			<p className="text-xs text-gray-400">
				© 2024 ExpenseTracker AI. All rights reserved.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link className="text-xs hover:text-[#006FEE] transition-colors" href="#">
					Terms of Service
				</Link>
				<Link className="text-xs hover:text-[#006FEE] transition-colors" href="#">
					Privacy
				</Link>
			</nav>
		</footer>
	)
}
