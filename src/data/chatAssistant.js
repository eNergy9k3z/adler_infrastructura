import { knowledgeBase } from "../components/knowledgeBase.js";

export function basicChatResponse(query) {
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

export function chatHistory(messages, question) {
  return [
    ...messages
      .filter((message) => message.id !== 0)
      .slice(-6)
      .map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text.slice(0, message.sender === "user" ? 1000 : 2000),
      })),
    { role: "user", content: question },
  ];
}

export async function requestAIReply(
  messages,
  { signal, fetchImpl = fetch } = {},
) {
  const response = await fetchImpl("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });
  if (!response.ok)
    throw new Error(response.status === 429 ? "rate_limited" : "unavailable");
  const result = await response.json();
  if (
    result.source !== "ai" ||
    typeof result.reply !== "string" ||
    !result.reply.trim() ||
    result.reply.length > 2000
  )
    throw new Error("unavailable");
  return result.reply;
}
