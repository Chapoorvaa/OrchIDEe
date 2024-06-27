import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Message } from './Chat';
import { fetchBotResponse } from './ChatbotService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userInput = input;
    setInput('');
    setLoading(true);

    const userMessage: Message = { text: userInput, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await fetchBotResponse(userInput);
      const botMessage: Message = { text: botResponse, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = { text: 'Error fetching response.', isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-between items-center border-4 border-gray-600 rounded-10 h-full w-full">
      <div
        style={{ minHeight: '300px' }}
        className="overflow-y-auto border-4 border-gray-600 rounded-10 mx-2.5 mt-2.5 bg-silver flex flex-col h-80 w-11/12">
        {messages.map((message, index) => (
          <div key={index} className={`text-gray-600 ${message.isUser ? 'text-right' : 'text-left'} m-2 py-1 px-2 rounded-lg ${message.isUser ? 'bg-green-200' : 'bg-white'} inline-block`}>
            {message.text}
          </div>
        ))}
        {loading && <div className="flex justify-center items-center relative py-8 px-0 mx-[-5%] overflow-hidden">
          <div style={dotTypingStyle}>
            <style>{keyframes}</style>
          </div>
        </div>}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center justify-around my-2.5 w-full">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex p-2 text-sm rounded-lg border border-gray-300 w-1/2"
        />
        <button type="submit" className="px-5 py-2 text-sm rounded-lg bg-blue-500 text-white cursor-pointer">Send</button>
      </form>
    </div>
  );
};

// I have not found a way to turn this into Tailwind CSS so this stays normal-ish CSS
const dotTypingStyle = {
  position: 'relative' as const,
  left: '-9999px',
  width: '10px',
  height: '10px',
  borderRadius: '5px',
  backgroundColor: 'white',
  color: 'white',
  boxShadow: '9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white',
  animation: 'dot-typing 1.5s infinite linear'
};

const keyframes = `
    @keyframes dot-typing {
      0% {
        box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
      }
      16.667% {
        box-shadow: 9984px -10px 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
      }
      33.333% {
        box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
      }
      50% {
        box-shadow: 9984px 0 0 0 white, 9999px -10px 0 0 white, 10014px 0 0 0 white;
      }
      66.667% {
        box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
      }
      83.333% {
        box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px -10px 0 0 white;
      }
      100% {
        box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
      }
    }
  `;

export default Chatbot;
