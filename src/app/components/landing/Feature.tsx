import { Card, CardBody, CardHeader } from "@nextui-org/react"

export default function Feature({
	icon,
	title,
	description
}:{
	icon: React.ReactNode,
	title: string,
	description: string
}) {
	return (
		<Card className="border border-primary/60 bg-transparent px-5 py-5 max-w-md-[400px]">
			<CardHeader className="flex gap-3 flex-col justify-center">
				{icon}
				<p className="font-bold text-xl">
					{title}
				</p>
			</CardHeader>
			<CardBody className="flex flex-col justify-center text-center">
				<p className="text-gray-400">
					{description}
				</p>
			</CardBody>
		</Card>
	)
}
