import { ChatOpenAI } from '@langchain/openai';
import { StateGraph, MessagesAnnotation, Annotation } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { obtainName } from '../tools/tool_obtain-external-data';

const tools = [obtainName];
const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({
  temperature: 0,
}).bindTools(tools);

const shouldContinue = ({ messages }: typeof MessagesAnnotation.State) => {
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.additional_kwargs.tool_calls) {
    return 'tools';
  }
  return '__end__';
};

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addEdge('__start__', 'agent')
  .addNode('tools', toolNode)
  .addEdge('tools', 'agent')
  .addConditionalEdges('agent', shouldContinue);

export const app = workflow.compile();