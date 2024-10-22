import { generateSteamDate } from "@/utils/langchain/llm/stream-content";

export const maxDuration = 60;

export async function POST(req: Request) {
	try {
		const { messages } = await req.json()

		return generateSteamDate(messages)

	} catch (e: any) {
		return Response.json({ error: e.message }, { status: e.status ?? 500 })
	}
}
