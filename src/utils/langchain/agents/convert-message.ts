import { BaseMessage, HumanMessage, AIMessage, ToolMessage, ChatMessage } from '@langchain/core/messages';
import { Message as VercelChatMessage } from 'ai';

export function convertVercelMessagesToLangChain(messages: VercelChatMessage[]): BaseMessage[] {
  return messages.map((message) => {
    switch (message.role) {
      case 'user':
        return new HumanMessage(message.content);
      case 'assistant':
        return new AIMessage(message.content);
      case 'function':
        return new ToolMessage({
          content: message.content,
          tool_call_id: message.id,
          name: message.name,
        });
      default:
        throw new Error(`Rol no soportado: ${message.role}`);
    }
  });
}

export const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};