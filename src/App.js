
import './App.css';
import React, { useState, useRef, useEffect } from "react";


function App() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatWindowRef = useRef(null);

  const [threads, setThreads] = useState([
    { name: "New Thread", date: "Today" },
    { name: "Thread name lorem ipsum", date: "Today" },
    { name: "Thread name lorem ipsum", date: "Yesterday" },
    { name: "Thread name lorem ipsum", date: "Previous 7 days" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContentRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate an AI response
    setTimeout(() => {
      const botMessage = { role: "assistant", text: "This is a dummy response!" };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };


  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setIsBotTyping(true);
    setTimeout(() => {
      const botMessage = {
        text: "This is a simulated bot response.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 2000);
  };


  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };


  return (
    <div className="chat-app-container">
    <div className="chat-app">
      {/* Header */}
      <div className="chat-header">
        <h1>AI Assistant</h1>
        <div className="header-icons">
          <button className="icon-button">🔍</button>
          <button className="icon-button">⚙️</button>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <button className="new-thread">+ New Thread</button>
          {threads.map((thread, index) => (
            <div key={index} className="thread">
              <span className="thread-name">{thread.name}</span>
              <span className="thread-date">{thread.date}</span>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <h2>How can I help today?</h2>
              <p>Choose a suggestion or use the text field to ask a question.</p>
              <div className="suggestions">
                <button>What are the most popular open-source licenses?</button>
                <button>Generate this as a suggestion</button>
              </div>
            </div>
          ) : (
            <div className="chat-content" ref={chatContentRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.role}`}
                >
                  <span className="message-icon">
                    {msg.role === "user" ? "😊" : "🤖"}
                  </span>
                  {msg.text}
                </div>
              ))}
              {loading && <div className="loading">Analyzing your query...</div>}
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask the AI Assistant a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
