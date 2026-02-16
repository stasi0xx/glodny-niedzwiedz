'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ConversationState, ChatMessage } from '../../types/chat';

const INITIAL_STATE: ConversationState = {
    intent: 'idle',
    data: { dietPreferences: {} },
    history: []
};

export const KubaWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'assistant',
            content: "Cześć! Jestem Kuba 🐻. Pomogę Ci dobrać dietę, sprawdzić dowóz lub odpowiem na pytania.",
            options: ["Dobierz dietę", "Sprawdź dowóz", "FAQ", "Pokaż menu"]
        }
    ]);
    const [conversationState, setConversationState] = useState<ConversationState>(INITIAL_STATE);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        // Optimistic update
        const userMsg: ChatMessage = { id: Date.now().toString(), content: textToSend, role: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: textToSend,
                    currentState: conversationState
                })
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const data = await res.json();
            const { messages: newMessages, newState } = data;

            setConversationState(newState);
            setMessages(prev => [...prev, ...newMessages]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Przepraszam, coś poszło nie tak. Spróbuj ponownie później."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[600px] h-[500px] transition-all duration-300 ease-in-out font-sans">
                    {/* Header */}
                    <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl relative">
                                🐻
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-emerald-600"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Kuba</h3>
                                <p className="text-xs text-emerald-100">Asystent Dietetyczny</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setMessages([{ id: 'init', role: 'assistant', content: "Zresetowano rozmowę.", options: ["Dobierz dietę", "Sprawdź dowóz", "FAQ"] }])} className="text-white/60 hover:text-white" title="Reset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${msg.role === 'user'
                                    ? 'bg-emerald-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.content}
                                </div>

                                {/* Product Card */}
                                {msg.productCard && (
                                    <div className="mt-2 w-full max-w-[85%] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                                        {/* Simple Image Placeholder or actual Image if needed */}
                                        <div className="h-24 bg-gray-100 flex items-center justify-center text-gray-400">
                                            {msg.productCard.image ? <img src={msg.productCard.image} alt={msg.productCard.title} className="w-full h-full object-cover" /> : <span>🥗</span>}
                                        </div>
                                        <div className="p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-gray-900">{msg.productCard.title}</h4>
                                                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">{msg.productCard.price} zł/dzień</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-3">{msg.productCard.description}</p>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {msg.productCard.matches.map(m => (
                                                    <span key={m} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{m}</span>
                                                ))}
                                            </div>
                                            {msg.checkoutLink && (
                                                <Link
                                                    href={msg.checkoutLink}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block w-full text-center bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-emerald-700 transition"
                                                >
                                                    Zamów teraz
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Replies for this message */}
                                {msg.options && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {msg.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => handleSend(opt)}
                                                className="text-xs bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition shadow-sm"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Napisz wiadomość..."
                            disabled={isLoading}
                            className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none disabled:bg-gray-50"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            className="rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 004.836 9.613l2.25.75a1.5 1.5 0 010 2.874l-2.25.75a1.5 1.5 0 00-1.144 1.45l-1.414 4.925a.75.75 0 00.933.933l16-5.5a.75.75 0 000-1.415l-16-5.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none z-50 ${isOpen ? 'bg-gray-800 text-white' : 'bg-emerald-600 text-white'}`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                ) : (
                    <span className="text-2xl relative">
                        🐻
                        <span className="absolute top-0 right-0 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </span>
                )}
            </button>
        </div>
    );
};
