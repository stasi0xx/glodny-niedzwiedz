'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { kubaKnowledge } from '../../data/kubaKnowledge';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};

export const KubaWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: kubaKnowledge.responses.default, sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = kubaKnowledge.responses.default;

            if (lowerInput.includes('dowóz') || lowerInput.includes('dostaw') || lowerInput.includes('gdzie')) {
                responseText = kubaKnowledge.responses.delivery;
            } else if (lowerInput.includes('cen') || lowerInput.includes('koszt')) {
                responseText = kubaKnowledge.responses.price;
            } else if (lowerInput.includes('alerg') || lowerInput.includes('bez laktoz')) {
                responseText = kubaKnowledge.responses.allergens;
            } else if (lowerInput.includes('diet') || lowerInput.includes('schudnąć')) {
                responseText = kubaKnowledge.responses.dietHelper;
            }

            // Disclaimer check
            if (lowerInput.includes('zdrow') || lowerInput.includes('chor')) {
                responseText += `\n\n${kubaKnowledge.responses.medicalDisclaimer}`;
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    const handleQuickReply = (text: string) => {
        setInput(text);
        // Automatically send after a short delay to simulate "clicking"
        // We can just set input and let user send, or auto send. auto send is better UX for quick replies.
    };

    // Auto send effect for quick reply if needed, but for now let's just populate input or handle directly.
    // Let's modify handleQuickReply to send directly.
    const handleQuickReplySend = (text: string) => {
        const userMsg: Message = { id: Date.now().toString(), text: text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const lowerInput = text.toLowerCase();
            let responseText = kubaKnowledge.responses.default;

            if (lowerInput.includes('dowóz') || lowerInput.includes('dostaw')) {
                responseText = kubaKnowledge.responses.delivery;
            } else if (lowerInput.includes('cen')) {
                responseText = kubaKnowledge.responses.price;
            } else if (lowerInput.includes('alerg')) {
                responseText = kubaKnowledge.responses.allergens;
            } else if (lowerInput.includes('dobierz') || lowerInput.includes('diet')) {
                responseText = kubaKnowledge.responses.dietHelper;
            } else if (lowerInput.includes('jak działa')) {
                responseText = "To proste! 1. Wybierasz dietę. 2. Zamawiasz online. 3. My gotujemy i dostarczamy pod Twoje drzwi.";
            } else if (lowerInput.includes('płatności')) {
                responseText = "Obsługujemy szybkie płatności online, BLIK oraz karty płatnicze.";
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    }


    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[500px] transition-all duration-300 ease-in-out font-sans">
                    {/* Header */}
                    <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🐻</div>
                            <div>
                                <h3 className="font-bold text-sm">Kuba</h3>
                                <p className="text-xs text-emerald-100">Asystent Dietetyczny</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-[350px]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-emerald-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.text.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length < 3 && (
                        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
                            {kubaKnowledge.quickReplies.map(reply => (
                                <button
                                    key={reply}
                                    onClick={() => handleQuickReplySend(reply)}
                                    className="whitespace-nowrap rounded-full bg-white border border-emerald-200 px-3 py-1 text-xs text-emerald-700 hover:bg-emerald-50"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Zapytaj o dietę..."
                            className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50"
                            disabled={!input.trim()}
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
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none ${isOpen ? 'bg-gray-700 text-white' : 'bg-emerald-600 text-white'}`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                ) : (
                    <span className="text-2xl">🐻</span>
                )}
            </button>
        </div>
    );
};
