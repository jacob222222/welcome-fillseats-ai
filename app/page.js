"use client";
import { useState } from "react";

export default function ParentPage() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "AI assistant: Hi, I am Welcome. Ask about a spot, price, hours, or a tour, in English, Spanish, or Somali." },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  async function send() {
    if (!input.trim()) return;
    const userText = input;
    setMessages((m) => [...m, { role: "parent", text: userText }]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText, language }),
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: "agent", text: data.reply }]);
  }

  return (
    <main>
      <h1>Welcome - Parent view</h1>
      <p>Sunshine Family Childcare, Cambridge, MN - fictional demo only. No real children or parents.</p>
      <label>
        Language:{" "}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="so">Somali</option>
        </select>
      </label>
      <div style={{ border: "1px solid #ccc", padding: 16, marginTop: 16, minHeight: 200 }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.text}</p>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a toddler spot, price, or tour"
          style={{ width: "70%", padding: 8 }}
        />
        <button onClick={send} style={{ padding: 8, marginLeft: 8 }}>Send</button>
      </div>
      <p><a href="/director">Go to director briefing view</a></p>
      <p>Voice note upload and SAM face blur plus Muse Image flyer are the next steps after this skeleton. They plug into lib/agent.js and a new vision route.</p>
    </main>
  );
}
