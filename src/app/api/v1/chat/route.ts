import { generateSteamDate } from '@/utils/langchain/llm/stream-content'
import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { finalState } from '@/utils/langchain/agents/final-state-handler'
import { obtainName } from '@/utils/langchain/tools/tool_obtain-external-data'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { isAIMessage } from '@langchain/core/messages'

import {
	AIMessage,
	BaseMessage,
	ChatMessage,
	HumanMessage,
	SystemMessage
} from '@langchain/core/messages'
import {
	LangChainAdapter,
	Message as VercelChatMessage,
	OpenAIStream,
	StreamingTextResponse
} from 'ai'

export const runtime = 'edge'

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
	if (message.role === 'user') {
		return new HumanMessage(message.content)
	} else if (message.role === 'assistant') {
		return new AIMessage(message.content)
	} else {
		return new ChatMessage(message.content, message.role)
	}
}

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
	if (message._getType() === 'human') {
		return { content: message.content, role: 'user' }
	} else if (message._getType() === 'ai') {
		return {
			content: message.content,
			role: 'assistant',
			tool_calls: (message as AIMessage).tool_calls
		}
	} else {
		return { content: message.content, role: message._getType() }
	}
}

const AGENT_SYSTEM_TEMPLATE = `You are a stereotypical robot named Robbie and must answer all questions like a stereotypical robot. Use lots of interjections like "BEEP" and "BOOP".

If you don't know how to answer a question, use the available tools to look up relevant information.`

/*export async function POST(req: Request) {
	try {

		const { messages }: { messages: VercelChatMessage[] } = await req.json();

		const response = await finalState(messages);
		//const stream = await generateSteamDate(messages);

		return Response.json(response);
		  //return LangChainAdapter.toDataStreamResponse(test);

	} catch (e: any) {
		return Response.json({ error: e.message }, { status: e.status ?? 500 })
	}
}*/

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const messages = (body.messages ?? [])
			.filter(
				(message: VercelChatMessage) => message.role === 'user' || message.role === 'assistant'
			)
			.map(convertVercelMessageToLangChainMessage)
		const returnIntermediateSteps = body.show_intermediate_steps

		const chatModel = new ChatOpenAI({
			model: 'gpt-4o-mini',
			temperature: 0.2
		})

		const agent = await createReactAgent({
			llm: chatModel,
			tools: [obtainName],
			/**
			 * Modify the stock prompt in the prebuilt agent. See docs
			 * for how to customize your agent:
			 *
			 * https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/
			 */
			messageModifier: new SystemMessage(AGENT_SYSTEM_TEMPLATE)
		})

		if (!returnIntermediateSteps) {
			const eventStream = await agent.streamEvents(
				{ messages },
				{ version: 'v2' }
			)

			const textEncoder = new TextEncoder()
			const transformStream = new ReadableStream({
				async start(controller) {
					for await (const { event, data } of eventStream) {
						if (event === 'on_chat_model_stream') {
							// Intermediate chat model generations will contain tool calls and no content
							if (!!data.chunk.content) {
								controller.enqueue(textEncoder.encode(data.chunk.content))
							}
						}
					}
					controller.close()
				}
			})
			console.log(new StreamingTextResponse(transformStream))
			return new StreamingTextResponse(transformStream)
		} else {
			console.log('ENTER TO ELSE STATEMENT')
			/**
			 * We could also pick intermediate steps out from `streamEvents` chunks, but
			 * they are generated as JSON objects, so streaming and displaying them with
			 * the AI SDK is more complicated.
			 */
			const result = await agent.invoke({ messages })
			return NextResponse.json(
				{
					messages: result.messages.map(convertLangChainMessageToVercelMessage)
				},
				{ status: 200 }
			)
		}
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
	}
}
