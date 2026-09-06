import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Trash2,
  Send,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  basicChatResponse,
  chatHistory,
  requestAIReply,
} from "../data/chatAssistant";
import "./Chatbot.css";
const welcome = {
  id: 0,
  sender: "bot",
  text: "Hola. Puedo orientarle sobre los servicios de Adler: infraestructura, contratos, materiales e IA para empresas. ¿Qué necesita consultar?",
};
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("checking");
  const [loading, setLoading] = useState(false);
  const pending = useRef(null);
  const toggleRef = useRef(null),
    inputRef = useRef(null),
    logRef = useRef(null),
    nextId = useRef(1);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch("/api/chat", { signal: controller.signal, cache: "no-store" })
      .then(
        async (response) =>
          response.ok && (await response.json()).available === true,
      )
      .then((available) => {
        if (active) setMode(available ? "ai" : "basic");
      })
      .catch(() => {
        if (active) setMode("basic");
      })
      .finally(() => clearTimeout(timer));
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen]);
  useEffect(
    () => () => {
      pending.current?.abort();
      pending.current = null;
    },
    [],
  );
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, isOpen, loading]);
  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };
  const send = async (value) => {
    const text = value.trim();
    if (!text || pending.current || mode === "checking") return;
    const history = chatHistory(messages, text);
    setMessages((previous) => [
      ...previous,
      { id: nextId.current++, sender: "user", text },
    ]);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
    if (mode !== "ai") {
      setMessages((previous) => [
        ...previous,
        {
          id: nextId.current++,
          sender: "bot",
          text: basicChatResponse(text),
          source: "basic",
        },
      ]);
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    const timer = setTimeout(() => controller.abort(), 22000);
    setLoading(true);
    try {
      const reply = await requestAIReply(history, {
        signal: controller.signal,
      });
      if (pending.current !== controller) return;
      setMessages((previous) => [
        ...previous,
        { id: nextId.current++, sender: "bot", text: reply, source: "ai" },
      ]);
    } catch (error) {
      if (pending.current !== controller) return;
      setMessages((previous) => [
        ...previous,
        {
          id: nextId.current++,
          sender: "bot",
          text: basicChatResponse(text),
          source: "fallback",
          notice:
            error.message === "rate_limited"
              ? "La IA alcanzó su límite temporal. Esta es una respuesta básica."
              : "La IA no está disponible ahora. Esta es una respuesta básica.",
        },
      ]);
    } finally {
      clearTimeout(timer);
      if (pending.current === controller) {
        pending.current = null;
        setLoading(false);
      }
    }
  };
  const clear = () => {
    pending.current?.abort();
    pending.current = null;
    setLoading(false);
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
              <p>
                {mode === "checking"
                  ? "Preparando asistente…"
                  : mode === "ai"
                    ? "Respuestas con inteligencia artificial"
                    : "Información sobre nuestros servicios"}
              </p>
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
          {mode === "ai" && (
            <p className="chat-privacy">
              Su pregunta y los últimos mensajes se envían a OpenRouter y al
              proveedor del modelo. Evite datos confidenciales. La IA puede
              equivocarse.{" "}
              <a
                href="https://openrouter.ai/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Uso de datos
              </a>
            </p>
          )}
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
                {msg.source && (
                  <span className="chat-message-source">
                    {msg.source === "ai"
                      ? "Respuesta de IA"
                      : "Información de Adler"}
                  </span>
                )}
                {msg.notice && (
                  <span className="chat-fallback-notice">{msg.notice}</span>
                )}
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="message bot chat-loading" role="status">
                <Loader2 size={17} className="sending-spinner" /> Preparando
                respuesta…
              </div>
            )}
          </div>
          {messages.length === 1 && (
            <div className="chat-suggestions" aria-label="Consultas frecuentes">
              {[
                "Vialidad",
                "Contratos",
                "Materiales",
                "Inteligencia artificial",
              ].map((text) => (
                <button
                  type="button"
                  key={text}
                  disabled={loading || mode === "checking"}
                  onClick={() => send(text)}
                >
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
              disabled={!input.trim() || loading || mode === "checking"}
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
