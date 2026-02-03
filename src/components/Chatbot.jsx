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

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");

        // Add User Message
        setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);

        // Show "Thinking..."
        setIsTyping(true);

        try {
            // Call our new Serverless Function
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userText }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { id: Date.now() + 1, text: data.text, sender: 'bot' }]);
        } catch (error) {
            console.error("Chat Error:", error);
            // Fallback en caso de error de servidor
            alert(`Error de Conexión IA: ${error.message}`);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Disculpa, tengo problemas para conectarme con mi cerebro central.",
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
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
