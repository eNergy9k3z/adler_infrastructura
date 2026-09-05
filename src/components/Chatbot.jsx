import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Trash2, Send, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { knowledgeBase } from "./knowledgeBase";
import "./Chatbot.css";
const welcome = {
  id: 0,
  sender: "bot",
  text: "Hola. Puedo orientarle sobre los servicios de Adler: infraestructura, contratos, materiales e IA para empresas. ¿Qué necesita consultar?",
};
function getResponse(query) {
  const text = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let bestMatch = null,
    highestScore = 0;
  for (const topic of knowledgeBase) {
    const score = topic.keywords.filter((keyword) =>
      keyword.trim().length <= 3
        ? text.split(/[^a-z0-9]+/).includes(keyword.trim())
        : text.includes(keyword),
    ).length;
    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }
  return (
    bestMatch?.response ||
    "Puedo orientarle sobre infraestructura vial, contratos, materiales e inteligencia artificial. Para revisar su caso con Adler, utilice el enlace de contacto de abajo."
  );
}
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState("");
  const toggleRef = useRef(null),
    inputRef = useRef(null),
    logRef = useRef(null),
    nextId = useRef(1);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen]);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, isOpen]);
  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };
  const send = (value) => {
    const text = value.trim();
    if (!text) return;
    setMessages((previous) => [
      ...previous,
      { id: nextId.current++, sender: "user", text },
      { id: nextId.current++, sender: "bot", text: getResponse(text) },
    ]);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };
  const clear = () => {
    setMessages([welcome]);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };
  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="chat-button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
        aria-expanded={isOpen}
        aria-controls="adler-assistant"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
      {isOpen && (
        <section
          id="adler-assistant"
          className="chat-window"
          role="dialog"
          aria-label="Asistente informativo de Adler"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
          }}
        >
          <header className="chat-header">
            <div>
              <h2>Asistente Adler</h2>
              <p>Orientación sobre nuestros servicios</p>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-action-btn"
                type="button"
                onClick={clear}
                aria-label="Borrar conversación"
                title="Borrar conversación"
              >
                <Trash2 size={18} />
              </button>
              <button
                className="chat-action-btn"
                type="button"
                onClick={close}
                aria-label="Cerrar ventana del asistente"
              >
                <X size={20} />
              </button>
            </div>
          </header>
          <div
            className="chat-messages"
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Conversación"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <span className="sr-only">
                  {msg.sender === "bot" ? "Adler: " : "Usted: "}
                </span>
                {msg.text}
              </div>
            ))}
          </div>
          {messages.length === 1 && (
            <div className="chat-suggestions" aria-label="Consultas frecuentes">
              {[
                "Vialidad",
                "Contratos",
                "Materiales",
                "Inteligencia artificial",
              ].map((text) => (
                <button type="button" key={text} onClick={() => send(text)}>
                  {text}
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              className="chat-input"
              aria-label="Su consulta al asistente"
              placeholder="Escriba su consulta…"
              maxLength={1000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="chat-send"
              type="submit"
              disabled={!input.trim()}
              aria-label="Enviar consulta al asistente"
            >
              <Send size={19} />
            </button>
          </form>
          <Link className="chat-contact" to="/#contacto" onClick={close}>
            Consultar mi caso con Adler <ArrowUpRight size={15} />
          </Link>
        </section>
      )}
    </>
  );
}
