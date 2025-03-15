import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageSquare, SendHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const BACKEND_URL = "http://localhost:3000"; // Set your backend URL here

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [csvData, setCsvData] = useState<string | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/scholarships_data.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        setCsvData(data);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
        setCsvData(null);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) return null;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context: csvData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.message) {
        throw new Error("Invalid response from the server");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response from Gemini API:', error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I am unable to process your request at the moment. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button onClick={toggleChat} className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all">
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed bottom-20 right-6 z-40 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden glass-morphism border-gray-200 border bg-white flex flex-col h-[30rem]">
            <div className="p-4 border-b flex justify-between items-center bg-primary/5">
              <h3 className="font-medium text-gray-800">ScholarMatch Assistant</h3>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 rounded-full hover:bg-gray-200">
                <X size={18} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-[10px] opacity-70 mt-1 text-right">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && <motion.div className="flex justify-start"><div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg"><Loader2 className="h-4 w-4 animate-spin text-gray-500" /></div></motion.div>}
              <div ref={messageEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
              <div className="flex items-center gap-2">
                <Input ref={inputRef} type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} className="focus-ring" disabled={isLoading} />
                <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90">
                  <SendHorizontal size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
