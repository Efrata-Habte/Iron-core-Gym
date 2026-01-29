# 07. AI Chatbot Explained

This feature allows users to chat with a "Personal Trainer AI".
We use **Google Gemini** (like ChatGPT, but from Google).

## 1. The Setup (API Key)
You need a key to talk to Google. We store it in `.env` so hackers can't steal it.
`GEMINI_API_KEY=AIzaSy...`

---

## 2. The Helper Function (`utils/geminiUtil.js`)

We write a specific function just to talk to Google.

**The English Explanation**:
1.  Connect to Google with the Key.
2.  Prepare the "Prompt". We don't just send the user's question. We wrap it in a **Persona**.
    -   *User says*: "How do I lose weight?"
    -   *We send*: "You are a professional Gym Trainer. The user asks: How do I lose weight?"
3.  Send it and wait for the text response.

**The Code**:
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getGymAdvice = async (userMessage) => {
    // Connect
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The Persona (Context)
    const prompt = `
        You are IronCoach, a tough but encouraging gym trainer.
        User: "${userMessage}"
    `;

    // Talk to Google
    const result = await model.generateContent(prompt);
    
    // Extract Text
    return result.response.text();
};
```

---

## 3. The Controller (`controllers/aiChatbotController.js`)

This just connects the Frontend to the Helper.

```javascript
exports.chat = async (req, res) => {
    const { message } = req.body; // Frontend sends: { "message": "Hi" }

    try {
        const reply = await getGymAdvice(message); // Call Helper
        res.json({ reply }); // Send back: { "reply": "Go lift weights!" }
    } catch (err) {
        res.status(500).json({ reply: "I am offline." });
    }
};
```

## 4. Why use a Backend?
*Question*: Why not call Google directly from the Frontend (React)?
*Answer*: **Security**. If you check the code in the browser, you can see the API Key. By doing it on the Server, the key stays hidden.
