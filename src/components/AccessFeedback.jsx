export default function AccessFeedback({ feedback }) {
  if (!feedback) return null;
  return <p className={`private-${feedback.tone === "success" ? "notice" : feedback.tone}`} role={feedback.tone === "success" ? "status" : "alert"}>
    <strong>{feedback.title}</strong>{feedback.message}
  </p>;
}
