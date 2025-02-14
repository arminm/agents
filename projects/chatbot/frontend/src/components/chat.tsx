'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    setInputText('');

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        sendMessage();
        (e.target as HTMLTextAreaElement).style.height = '40px';
    }
  };

  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

return (
    <div className="flex flex-col min-w-[98vw] md:min-w-[70vw] max-w-6xl mx-auto bg-white shadow-lg rounded-lg min-h-[24rem] relative before:content-[''] before:absolute before:top-0 before:left-0 before:rounded before:right-0 before:h-[15px] before:bg-gradient-to-t before:from-transparent before:to-white">
        <div className="flex-1 overflow-y-auto space-y-4 pl-3 pr-3 pt-20 pb-20 mt-0 max-h-[calc(100vh-15rem)] rounded-lg">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        {formatMessageText(message.text)}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                        Thinking...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 rounded-lg bg-transparent p-4 flex gap-2 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <textarea
              value={inputText}
              onChange={(e) => {
                  setInputText(e.target.value);
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
              }}
              onKeyUp={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px] max-h-[200px]"
              rows={1}
              onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button
              onClick={() => {
                  sendMessage();
                  const textarea = document.querySelector('textarea');
                  if (textarea) textarea.style.height = '40px';
              }}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 h-10 self-end"
            >
              Send
            </button>
        </div>
    </div>
);
};

export default ChatComponent;