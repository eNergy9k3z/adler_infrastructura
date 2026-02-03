import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { knowledgeBase } from './knowledgeBase';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy el asistente técnico de Adler Infraestructura. 🏗️ Puedo responder dudas sobre procesos constructivos, detalle de servicios, gestión de contratos y más. ¿En qué te ayudo?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Intelligent Response Engine (Local Brain)
    const getResponse = (query) => {
        const text = query.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalize input

        let bestMatch = null;
        let highestScore = 0;

        knowledgeBase.forEach(topic => {
            let score = 0;
            topic.keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 1;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = topic;
            }
        });

        if (bestMatch && highestScore > 0) {
            return bestMatch.response;
        }

        // Default Fallback
        return "Entiendo tu interés. Mi base de datos actual cubre: Vialidad, Auditoría, Contratos y Tecnología. Para consultas más específicas, por favor escribe a info@adlerinfraestructura.com y un ingeniero senior atenderá tu caso. 🏗️";
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");

        // Add User Message
        setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);

        // Show "Thinking..."
        setIsTyping(true);

        // Simulate AI Delay
        setTimeout(() => {
            const botResponse = getResponse(userText);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 600);
    };

    const clearChat = () => {
        setMessages([
            { id: 1, text: "¡Hola! Soy el asistente técnico de Adler Infraestructura. 🏗️ Puedo responder dudas sobre procesos constructivos, detalle de servicios, gestión de contratos y más. ¿En qué te ayudo?", sender: 'bot' }
        ]);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`chat-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir chat"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-title">
                            <h3>Adler Asistente</h3>
                            <span className="chat-status">En línea</span>
                        </div>
                        <div className="chat-header-actions">
                            <button className="chat-action-btn" onClick={clearChat} title="Borrar conversación">
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                            <button className="chat-close" onClick={() => setIsOpen(false)}>×</button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < msg.text.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing">
                                <span>...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Escribe tu pregunta..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="chat-send" disabled={!inputValue.trim()}>
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
