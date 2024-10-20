import {
	Message as VercelChatMessage,
	LangChainAdapter
} from 'ai'

import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import {TEMPLATE} from '@/utils/langchain/templates/template-helper'


const formatMessage = (message: VercelChatMessage) => {
	return `${message.role}: ${message.content}`
}

export const maxDuration = 60;

export async function POST(req: Request) {
	try {
		const { messages } = await req.json()
		console.log(messages)

		const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
		const currentMessageContent = messages.at(-1).content

		console.log({ formattedPreviousMessages, currentMessageContent })


		const prompt = PromptTemplate.fromTemplate(TEMPLATE)

		const model = new ChatOpenAI({
			apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
			model: 'gpt-3.5-turbo',
			temperature: 0.8,
			verbose: false
		})

		const stringParser = new StringOutputParser();

		const chain = prompt.pipe(model).pipe(stringParser)

		const stream = await chain.stream({
			chat_history: formattedPreviousMessages.join('\n'),
			input: currentMessageContent
		})

		return LangChainAdapter.toDataStreamResponse(stream);

	} catch (e: any) {
		return Response.json({ error: e.message }, { status: e.status ?? 500 })
	}
}
