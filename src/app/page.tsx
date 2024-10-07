'use client'

import Hero from "./components/landing/Hero"
import KeyFeatures from "./components/landing/KeyFeatures"
import AIFunctions from "./components/landing/AIFunctions"
import Signup from "./components/landing/Signup"

export default function Home() {
	return (
		<main className='flex flex-col min-h-dvh'>
			<Hero />
			<KeyFeatures />
			<AIFunctions />
			<Signup />
		</main>
	)
}
