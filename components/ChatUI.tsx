'use client';

import { useState, useRef, useEffect } from 'react';
import { Product } from '@/lib/loadProducts';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Array<{
    id: string;
    name: string;
    shortDescription: string;
    price: number;
    category?: Product['category'];
    slug?: string;
  }>;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me demander des recommandations de produits, rechercher un produit spécifique, ou me poser des questions sur vos besoins beauté, nutrition ou bien-être.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    const userMessage: Message = {
      role: 'user',
      content: userMessageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'Désolé, je n\'ai pas pu traiter votre demande.',
        products: data.products || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Une erreur est survenue. Veuillez réessayer. Si le problème persiste, vérifiez votre connexion internet.',
          products: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto bg-white rounded-aroma border border-aroma-beige shadow-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-aroma p-4 ${
                message.role === 'user'
                  ? 'bg-aroma-green text-white'
                  : 'bg-aroma-beige text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {line.startsWith('**') && line.endsWith('**') ? (
                      <strong>{line.slice(2, -2)}</strong>
                    ) : line.startsWith('- ') ? (
                      <span className="block ml-2">• {line.slice(2)}</span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>

              {/* Products */}
              {message.products && message.products.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="text-sm font-semibold mb-2">Produits recommandés :</div>
                  {message.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block bg-white bg-opacity-90 rounded-lg p-3 hover:bg-opacity-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{product.name}</div>
                          <div className="text-xs text-gray-600">{product.shortDescription}</div>
                        </div>
                        <div className="text-aroma-green font-bold">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-aroma-beige rounded-aroma p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-aroma-green rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-aroma-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-aroma-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-aroma-beige p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 px-4 py-3 border border-aroma-green-light rounded-aroma focus:outline-none focus:ring-2 focus:ring-aroma-green"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-aroma-green text-white px-6 py-3 rounded-aroma font-medium hover:bg-aroma-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

