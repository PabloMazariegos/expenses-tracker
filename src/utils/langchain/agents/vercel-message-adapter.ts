// src/utils/VercelMessageAdapter.ts
import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Message as VercelChatMessage } from 'ai';

export class VercelMessageAdapter {
  static toLangGraphMessages(
    messages: VercelChatMessage[]
  ): BaseMessage[] {
    return messages.map((message) => {
      if (message.role === 'user') {
        return new HumanMessage(message.content);
      }
      // Maneja otros roles si es necesario
      throw new Error(`Rol no soportado: ${message.role}`);
    });
  }
}