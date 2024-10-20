'use client'

import React, { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Input, Button, Card, CardBody, CardFooter } from '@nextui-org/react'
import { User, Bot } from 'lucide-react'

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/v1/chat',
    onFinish: (response) => {
      console.log(response)
    }
  })

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <Card className="w-full max-w-3xl mx-auto h-[90vh] bg-gray-900">
      <CardBody className="p-4 flex flex-col justify-end">
        <div 
          ref={messagesContainerRef}
          className="overflow-y-auto flex flex-col space-y-4"
        >
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >

              {message.role !== 'user' && (
                <Bot className="w-6 h-6 mt-1 text-green-500 flex-shrink-0" />
              )}
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <User className="w-6 h-6 mt-1 text-blue-500 flex-shrink-0" />
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </CardBody>
      <CardFooter className="border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            className="flex-grow"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={handleInputChange}
            variant="bordered"
            color="primary"
          />
          <Button color="primary" type="submit">
            Enviar
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}