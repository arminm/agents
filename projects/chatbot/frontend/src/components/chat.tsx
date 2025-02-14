'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
        id: '1',
        text: `Once upon a time, in a small village nestled in the rolling hills of a far-off land, there lived a young girl named Luna. She was a curious and adventurous child, with a heart full of wonder and a mind full of questions.

One day, while exploring the woods near her village, Luna stumbled upon a hidden path she had never seen before. The path was overgrown with vines and shrubs, and it seemed to be calling to her. She felt an inexplicable pull, as if the path was beckoning her to follow it.

Luna's curiosity got the better of her, and she decided to follow the path. It wound its way through the woods, leading her deeper and deeper into the forest. The trees grew taller and the air grew sweeter, filled with the scent of blooming wildflowers.

As she walked, the path began to narrow and the trees grew closer together. Luna heard the sound of running water and her heart skipped a beat. She had always loved the sound of water, and she couldn't wait to see what was ahead.

Suddenly, the path opened up to a stunning waterfall. The water cascaded down a rocky cliff, creating a misty veil that surrounded Luna like a rainbow-colored aura. She felt as though she had stumbled upon a magical kingdom, hidden away from the rest of the world.

Luna sat down on a rock at the edge of the waterfall, feeling the cool mist on her face and the warm sun on her skin. She closed her eyes and let the sound of the water wash over her, feeling a deep sense of peace and tranquility.

As she sat there, Luna noticed something strange. The waterfall seemed to be changing, the water flowing in a pattern that looked almost like a message. She opened her eyes and looked closer, and to her amazement, she saw that the water was spelling out a word: "Dream".

Luna felt a shiver run down her spine. What did it mean? Was it a message from the universe, or just a trick of the light? She didn't know, but she felt a sense of wonder and awe that she had never felt before.

From that day on, Luna returned to the waterfall every day, feeling the magic of the place and trying to decipher the message of the water. And as she sat there, surrounded by the beauty of nature, she began to realize that the true magic was not in the waterfall, but in her own heart and imagination. The waterfall had simply shown her the way to tap into her own inner world, where dreams and wonder waited to be discovered.
`,
        sender: 'user',
        timestamp: new Date(),
    }
  ]);
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
    <div className="flex flex-col max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg min-h-[24rem] relative">
        <div className="flex-1 overflow-y-auto space-y-4 pb-20 max-h-[calc(100vh-20rem)] px-4">
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
        <div className="absolute bottom-0 left-0 right-0 bg-transparent p-4 flex gap-2 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm">
            <textarea
            value={inputText}
            onChange={(e) => {
                setInputText(e.target.value);
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            }}
            onKeyUp={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                sendMessage();
                (e.target as HTMLTextAreaElement).style.height = '40px';
                }
            }}
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