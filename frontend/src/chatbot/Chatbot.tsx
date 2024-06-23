import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Message } from './Chat';
import { fetchBotResponse } from './ChatbotService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await fetchBotResponse(input);
      const botMessage: Message = { text: botResponse, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = { text: 'Error fetching response.', isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput('');
  }; 

  return (
    <div style={styles.chatbotContainer}>
    <div style={styles.chatWindow}>
      {messages.map((message, index) => (
        <div key={index} style={message.isUser ? styles.userMessage : styles.botMessage}>
          {message.text}
        </div>
      ))}
    </div>
    <form onSubmit={handleSubmit} style={styles.inputForm}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        style={styles.inputField}
      />
      <button type="submit" style={styles.submitButton}>Send</button>
    </form>
  </div>
  );
};

const styles = {
  chatbotContainer: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif'
  },
  chatWindow: {
    height: '400px',
    overflowY: 'scroll' as const,
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'silver',
    display: 'flex',
    flexDirection: 'column' as const
  },
  userMessage: {
    color: 'grey',
    textAlign: 'right' as const,
    margin: '5px 0',
    padding: '5px 10px',
    borderRadius: '10px',
    backgroundColor: '#dcf8c6',
    display: 'inline-block'
  },
  botMessage: {
    color: 'grey',
    textAlign: 'left' as const,
    margin: '5px 0',
    padding: '5px 10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    display: 'inline-block'
  },
  inputForm: {
    display: 'flex',
    alignItems: 'center'
  },
  inputField: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px'
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default Chatbot;