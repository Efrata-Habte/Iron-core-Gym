# 07. AI Chatbot Deep Dive

This feature lets users talk to an AI "Personal Trainer". It connects to **Google Gemini**.

## The Service (`utils/geminiUtil.js`)
We separate the "AI Logic" from the "Controller" to keep things clean.

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getGymAdvice = async (userMessage) => {
    // 1. Initialize API with Key from .env
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. The Persona Prompt
    // We wrap the user's question to give it context.
    // If we didn't do this, the AI might act like a generic bot.
    const prompt = `
        You are an expert fitness trainer and nutritionist named IronCoach.
        Keep answers short (under 50 words) and motivating.
        User asks: "${userMessage}"
    `;

    // 3. Send to Google
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // 4. Return just the text
    return response.text();
};
```

## The Controller (`controllers/aiChatbotController.js`)
The controller simply handles the Traffic.

```javascript
exports.chat = async (req, res) => {
    const { message } = req.body; // e.g., "I want abs"

    try {
        // Call the service above
        const reply = await getGymAdvice(message);
        
        // Send back to frontend
        res.json({ reply });
    } catch (err) {
        // Fallback if AI is down
        res.status(500).json({ reply: "My brain is tired. Try again later." });
    }
};
```

## The Frontend (`home/Chatbot.jsx`)
1.  **State**: Keeps an array of messages `[{ text: "Hi", sender: "user" }, ...]`.
2.  **Send**:
    ```javascript
    // Add user message to UI immediately
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    // Call Backend
    const res = await fetch('/api/ai/chat', { ...body: input... });
    const data = await res.json();

    // Add AI reply to UI
    setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    ```
