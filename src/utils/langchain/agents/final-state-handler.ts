// src/utils/langchain/agents/finalStateHandler.ts
import { v4 as uuidv4 } from 'uuid';
import { HumanMessage,AIMessage } from '@langchain/core/messages';
import { convertVercelMessagesToLangChain, convertVercelMessageToLangChainMessage } from './convert-message';
import { app } from '@/utils/langchain/agents/new-agent'
import { Message as VercelChatMessage, LangChainAdapter } from 'ai';

export const finalState = async (nextMessage: VercelChatMessage[]) => {

  const messages = nextMessage.filter(
    (message: VercelChatMessage) => 
      message.role === 'user' || message.role === 'assistant',
  )
  .map(convertVercelMessageToLangChainMessage);

  const uuid = uuidv4();
  const config = { configurable: { thread_id: uuid } };

  const langChainMessages = convertVercelMessagesToLangChain(messages);

  const stream = await app.invoke({
    messages: langChainMessages,
    config,
  });

  return stream.messages[stream.messages.length - 1].content;
};