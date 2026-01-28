import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! I am your Iron Core AI assistant. How can I help you with your fitness and nutrition today?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = input.trim()
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setInput('')
        setLoading(true)

        try {
            const res = await fetch(`${API_URL}/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            })
            const data = await res.json()
            setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'Sorry, I couldn\'t get an answer.' }])
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to the trainer. Please try again later.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="chatbot-section glass">
            <div className="chatbot-container">
                <div className="chatbot-header">
                    <h2>AI <span className="red-text">TRAINER</span></h2>
                    <p>Get instant advice on exercise & nutrition</p>
                </div>

                <div className="chat-window">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.role}`}>
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className="chat-bubble ai loading">Thinking...</div>}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSend} className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about fitness..."
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading} className="send-btn">
                        <Send size={20} />
                    </button>
                </form>
            </div>

            <style>{`
                .chatbot-section {
                    margin: 4rem var(--section-side-padding);
                    padding: 2rem;
                    border-radius: 1rem;
                }
                .chatbot-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .chatbot-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .chat-window {
                    height: 400px;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: rgba(0,0,0,0.2);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }
                .chat-bubble {
                    padding: 0.8rem 1.2rem;
                    border-radius: 1rem;
                    max-width: 80% !important;
                    line-height: 1.4;
                    font-size: 0.95rem;
                }
                .chat-bubble.user {
                    align-self: flex-end;
                    background: var(--darker-red-font-color);
                    color: white;
                    border-bottom-right-radius: 0;
                }
                .chat-bubble.ai {
                    align-self: flex-start;
                    background: #333;
                    color: #eee;
                    border-bottom-left-radius: 0;
                }
                .chat-input-area {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .chat-input-area input {
                    width: 100%;
                    padding: 1rem;
                    padding-right: 3rem; /* Make room for the button */
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-color);
                    border-radius: 2rem; /* More rounded for chat feel */
                    color: white;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .chat-input-area input:focus {
                    border-color: var(--primary-color);
                }
                .send-btn {
                    position: absolute;
                    right: 2.6rem; /* Space from the right edge */
                    top: 50%;
                    transform: translateY(-50%); /* Perfect vertical centering */
                    background: none;
                    border: none;
                    color: var(--primary-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    border-radius: 50%;
                }
                .send-btn:hover:not(:disabled) {
                    background: var(--primary-color);
                    color: white; /* Contrast text color */
                    transform: translateY(-50%) scale(1.1); /* Keep centered while scaling */
                }
                .send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .loading {
                    font-style: italic;
                    background: none !important;
                    border: none !important;
                }
            `}</style>
        </section>
    )
}
